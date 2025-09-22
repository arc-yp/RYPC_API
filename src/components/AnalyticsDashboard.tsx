import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Download,
  Eye,
  Filter,
  LineChart,
  ListOrdered,
  RefreshCw,
  Search,
  Trophy,
  TrendingUp,
  Copy as CopyIcon,
  Trash2,
} from "lucide-react";
import { ReviewCard } from "../types";
import { storage } from "../utils/storage";
import { formatDate } from "../utils/helpers";

export const AnalyticsDashboard: React.FC = () => {
  const [cards, setCards] = useState<ReviewCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [metric, setMetric] = useState<"total" | "perDay">("total");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await storage.getCards();
        setCards(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    cards.forEach((c) => c.category && set.add(c.category));
    return ["all", ...Array.from(set).sort()];
  }, [cards]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cards
      .filter((c) =>
        categoryFilter === "all" ? true : c.category === categoryFilter
      )
      .filter(
        (c) =>
          !q ||
          c.businessName.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q)
      );
  }, [cards, search, categoryFilter]);

  const totals = useMemo(() => {
    const totalViews = filtered.reduce((sum, c) => sum + (c.viewCount || 0), 0);
    const avgViews = filtered.length
      ? Math.round(totalViews / filtered.length)
      : 0;
    return { totalViews, avgViews, count: filtered.length };
  }, [filtered]);

  const leaderboard = useMemo(() => {
    const now = Date.now();
    const score = (c: ReviewCard) => {
      if (metric === "total") return c.viewCount || 0;
      const days = Math.max(
        1,
        Math.round(
          (now - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        )
      );
      return (c.viewCount || 0) / days;
    };
    return [...filtered].sort((a, b) => score(b) - score(a)).slice(0, 10);
  }, [filtered, metric]);

  // Chart data for leaderboard (Top cards by views)
  const leaderboardChartData = useMemo(() => {
    const now = Date.now();
    return leaderboard.map((c) => {
      const days = Math.max(
        1,
        Math.round(
          (now - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        )
      );
      return {
        label: c.slug,
        fullLabel: c.businessName,
        value:
          metric === "total" ? c.viewCount || 0 : (c.viewCount || 0) / days,
      };
    });
  }, [leaderboard, metric]);

  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, { views: number; count: number }>();
    filtered.forEach((c) => {
      const key = c.category || "Uncategorized";
      const entry = map.get(key) || { views: 0, count: 0 };
      entry.views += c.viewCount || 0;
      entry.count += 1;
      map.set(key, entry);
    });
    return Array.from(map.entries())
      .map(([category, v]) => ({
        category,
        ...v,
        avg: v.count ? Math.round(v.views / v.count) : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);
  }, [filtered]);

  // Chart data for category share
  const categoryChartData = useMemo(() => {
    return categoryBreakdown.map((row) => ({
      label: row.category,
      value: row.views,
    }));
  }, [categoryBreakdown]);

  const velocity = useMemo(() => {
    // Extra feature: view velocity = views per day since created
    const now = Date.now();
    return [...filtered]
      .map((c) => {
        const created = new Date(c.createdAt).getTime();
        const days = Math.max(
          1,
          Math.round((now - created) / (1000 * 60 * 60 * 24))
        );
        const perDay = (c.viewCount || 0) / days;
        return { ...c, days, perDay };
      })
      .sort((a, b) => b.perDay - a.perDay)
      .slice(0, 10);
  }, [filtered]);

  const zeroViewCards = useMemo(
    () => filtered.filter((c) => (c.viewCount || 0) === 0),
    [filtered]
  );

  // New chart: Views Distribution (bucketed)
  const viewsDistribution = useMemo(() => {
    const buckets = [
      { label: '0', min: 0, max: 0 },
      { label: '1-10', min: 1, max: 10 },
      { label: '11-100', min: 11, max: 100 },
      { label: '101-1k', min: 101, max: 1000 },
      { label: '1001+', min: 1001, max: Number.POSITIVE_INFINITY },
    ];
    const counts = buckets.map(() => 0);
    filtered.forEach(c => {
      const v = c.viewCount || 0;
      const idx = buckets.findIndex(b => v >= b.min && v <= b.max);
      if (idx >= 0) counts[idx] += 1;
    });
    return buckets.map((b, i) => ({ label: b.label, value: counts[i] }));
  }, [filtered]);

  const handleDelete = async (id: string) => {
    try {
      await storage.deleteCard(id);
      // Refresh local state
      const fresh = await storage.getCards();
      setCards(fresh);
    } catch (e) {
      console.error("Failed to delete card", e);
    }
  };

  const exportCSV = (rowsSource: ReviewCard[]) => {
    const header = [
      "businessName",
      "slug",
      "category",
      "type",
      "views",
      "createdAt",
      "updatedAt",
      "viewsPerDay",
    ];
    const now = Date.now();
    const rows = rowsSource.map((c) => {
      const days = Math.max(
        1,
        Math.round(
          (now - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        )
      );
      const perDay = ((c.viewCount || 0) / days).toFixed(2);
      return [
        c.businessName,
        c.slug,
        c.category,
        c.type,
        String(c.viewCount || 0),
        c.createdAt,
        c.updatedAt,
        perDay,
      ];
    });
    const csv = [header, ...rows]
      .map((r) =>
        r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await storage.syncData();
      const fresh = await storage.getCards();
      setCards(fresh);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.href = "/admin")}
              className="inline-flex items-center px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/15"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
            <h1 className="text-2xl lg:text-3xl font-semibold text-white flex items-center gap-2 tracking-tight">
              <BarChart3 className="w-6 h-6 text-blue-300" /> Analytics
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center px-3 py-2 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 border border-white/10 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />{" "}
              {refreshing ? "Refreshing" : "Refresh"}
            </button>
            <button
              onClick={() => exportCSV(filtered)}
              className="inline-flex items-center px-3 py-2 bg-emerald-600/20 text-emerald-300 rounded-lg hover:bg-emerald-600/30 border border-white/10"
              title="Export filtered CSV"
            >
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-6 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by business or slug..."
              className="w-full pl-11 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-1">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-11 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
                aria-label="Filter by category"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-slate-800">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Metric toggle */}
          <div className="sm:col-span-1">
            <div className="bg-white/10 border border-white/20 rounded-xl p-1 flex">
              <button
                onClick={() => setMetric("total")}
                className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                  metric === "total"
                    ? "bg-blue-600/30 text-white"
                    : "text-slate-300"
                }`}
              >
                Total Views
              </button>
              <button
                onClick={() => setMetric("perDay")}
                className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                  metric === "perDay"
                    ? "bg-blue-600/30 text-white"
                    : "text-slate-300"
                }`}
              >
                Views / Day
              </button>
            </div>
          </div>
          <div className="sm:col-span-1">
            <div className="flex items-center gap-3 h-full">
              <div className="flex-1 bg-white/10 border border-white/20 rounded-xl p-3 text-center text-slate-300">
                <div className="text-xs">Total Views</div>
                <div className="text-2xl font-bold text-white">
                  {totals.totalViews.toLocaleString()}
                </div>
              </div>
              <div className="flex-1 bg-white/10 border border-white/20 rounded-xl p-3 text-center text-slate-300">
                <div className="text-xs">Avg Views/Card</div>
                <div className="text-2xl font-bold text-white">
                  {totals.avgViews.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-300">
            Loading analytics...
          </div>
        ) : (
          <div className="space-y-8">
            {/* Leaderboard */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-300" /> Top Cards by
                Views
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Chart */}
                <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                  <h3 className="text-slate-200 text-sm mb-2">
                    Top 10 ({metric === "total" ? "Total Views" : "Views/Day"})
                  </h3>
                  <BarChartHorizontal
                    data={leaderboardChartData}
                    maxBars={10}
                    height={260}
                    ariaLabel="Top cards by views chart"
                  />
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                  <div className="bg-white/10 border border-white/20 rounded-xl overflow-hidden min-w-[720px]">
                  <div className="grid grid-cols-12 gap-0 px-4 py-2 text-slate-300 text-xs border-b border-white/10">
                    <div className="col-span-1">#</div>
                    <div className="col-span-4">Business</div>
                    <div className="col-span-3">Slug</div>
                    <div className="col-span-2 flex items-center gap-1">
                      <Eye className="w-4 h-4" /> Views
                    </div>
                    <div className="col-span-2 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      /day
                    </div>
                  </div>
                  {leaderboard.length === 0 ? (
                    <div className="p-4 text-slate-400">No data</div>
                  ) : (
                    leaderboard.map((c, idx) => {
                      const days = Math.max(
                        1,
                        Math.round(
                          (Date.now() - new Date(c.createdAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                      );
                      const perDay = ((c.viewCount || 0) / days).toFixed(2);
                      return (
                        <div
                          key={c.id}
                          className="grid grid-cols-12 gap-0 px-4 py-3 text-slate-200 border-t border-white/5 hover:bg-white/5"
                        >
                          <div className="col-span-1 font-mono">{idx + 1}</div>
                          <div className="col-span-4">
                            <div className="font-medium text-white">
                              {c.businessName}
                            </div>
                            <div className="text-xs text-slate-400">
                              {c.category} • {c.type}
                            </div>
                          </div>
                          <div className="col-span-3 font-mono text-xs">
                            /{c.slug}
                          </div>
                          <div className="col-span-2">
                            {metric === "total"
                              ? (c.viewCount || 0).toLocaleString()
                              : perDay}
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-2 justify-end">
                              <a
                                href={`/${c.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-1 rounded-md bg-white/10 text-slate-200 text-xs border border-white/10"
                                title={`Open /${c.slug}`}
                                aria-label={`Open /${c.slug} in new tab`}
                              >
                                <Eye className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    `${window.location.origin}/${c.slug}`
                                  )
                                }
                                className="px-2 py-1 rounded-md bg-white/10 text-slate-200 text-xs border border-white/10"
                                title={`Copy link /${c.slug}`}
                                aria-label={`Copy link /${c.slug}`}
                              >
                                <CopyIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  </div>
                </div>
              </div>
            </section>

            {/* Category breakdown */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <ListOrdered className="w-5 h-5 mr-2 text-blue-300" /> Category
                Breakdown
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Donut chart */}
                <div className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center justify-center">
                  {categoryChartData.length === 0 ? (
                    <div className="text-slate-400">No data</div>
                  ) : (
                    <DonutChart
                      data={categoryChartData}
                      size={260}
                      thickness={26}
                      ariaLabel="Category share by views"
                    />
                  )}
                </div>
                {/* List */}
                <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                  <div className="space-y-3">
                    {categoryBreakdown.length === 0 && (
                      <div className="text-slate-400">No data</div>
                    )}
                    {categoryBreakdown.map((row) => (
                      <div
                        key={row.category}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <LegendDot index={row.category} />
                          <div className="text-white font-medium">
                            {row.category}
                          </div>
                          <div className="text-slate-400 text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {row.count} cards
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-200 text-sm">
                            {row.views.toLocaleString()} views
                          </div>
                          <div className="text-slate-400 text-xs">
                            avg {row.avg}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* View velocity */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-emerald-300" /> Fastest
                Growing (views/day)
              </h2>
              <div className="overflow-x-auto">
                <div className="bg-white/10 border border-white/20 rounded-xl overflow-hidden min-w-[720px]">
                <div className="grid grid-cols-12 gap-0 px-4 py-2 text-slate-300 text-xs border-b border-white/10">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Business</div>
                  <div className="col-span-3">Slug</div>
                  <div className="col-span-3">Views/day</div>
                </div>
                {velocity.length === 0 ? (
                  <div className="p-4 text-slate-400">No data</div>
                ) : (
                  velocity.map((c, idx) => (
                    <div
                      key={c.id}
                      className="grid grid-cols-12 gap-0 px-4 py-3 text-slate-200 border-t border-white/5 hover:bg-white/5"
                    >
                      <div className="col-span-1 font-mono">{idx + 1}</div>
                      <div className="col-span-5">
                        <div className="font-medium text-white">
                          {c.businessName}
                        </div>
                        <div className="text-xs text-slate-400">
                          Created {formatDate(c.createdAt)} • {c.days} days
                        </div>
                      </div>
                      <div className="col-span-3 font-mono text-xs">
                        /{c.slug}
                      </div>
                      <div className="col-span-3">{c.perDay.toFixed(2)}</div>
                    </div>
                  ))
                )}
                </div>
              </div>
            </section>

            {/* Zero view nudge - table */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-pink-300" /> Needs
                Attention (0 views)
              </h2>
              <div className="overflow-x-auto">
                <div className="bg-white/10 border border-white/20 rounded-xl overflow-hidden min-w-[720px]">
                <div className="grid grid-cols-12 gap-0 px-4 py-2 text-slate-300 text-xs border-b border-white/10">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Business</div>
                  {/* <div className="col-span-3">Slug</div> */}
                  <div className="col-span-2">Created</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                {zeroViewCards.length === 0 ? (
                  <div className="p-4 text-slate-400">
                    Great! All cards have views.
                  </div>
                ) : (
                  zeroViewCards.map((c, idx) => (
                    <div
                      key={c.id}
                      className="grid grid-cols-12 gap-0 px-4 py-3 text-slate-200 border-t border-white/5 hover:bg-white/5"
                    >
                      <div className="col-span-1 font-mono">{idx + 1}</div>
                      <div className="col-span-5">
                        <div className="font-medium text-white">
                          {c.businessName}
                        </div>
                        <div className="text-xs text-slate-400">
                          {c.category} • {c.type}
                        </div>
                      </div>
                      {/* <div className="col-span-3 font-mono text-xs">/{c.slug}</div> */}
                      <div className="col-span-2 text-xs text-slate-400">
                        {formatDate(c.createdAt)}
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2 justify-end">
                          <a
                            href={`/${c.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-md bg-white/10 text-slate-200 border border-white/10"
                            title="Open"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(
                                `${window.location.origin}/${c.slug}`
                              )
                            }
                            className="p-2 rounded-md bg-white/10 text-slate-200 border border-white/10"
                            title="Copy link"
                          >
                            <CopyIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="p-2 rounded-md bg-white/10 text-red-300 border border-white/10"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

// --- Lightweight SVG Charts (no external deps) ---

type BarDatum = { label: string; fullLabel?: string; value: number };

const BarChartHorizontal: React.FC<{
  data: BarDatum[];
  width?: number;
  height?: number;
  padding?: number;
  barGap?: number;
  maxBars?: number;
  ariaLabel?: string;
}> = ({
  data,
  width = 520,
  height = 240,
  padding = 24,
  barGap = 6,
  maxBars = 10,
  ariaLabel,
}) => {
  const trimmed = data.slice(0, maxBars);
  const max = Math.max(1, ...trimmed.map((d) => d.value));
  const innerW = width - padding * 2;
  const barAreaH = height - padding * 2;
  const barH = Math.max(
    8,
    Math.floor(
      (barAreaH - barGap * (trimmed.length - 1)) / Math.max(1, trimmed.length)
    )
  );

  const colors = ["#60a5fa", "#a78bfa", "#f472b6", "#34d399", "#fbbf24"];

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
    >
      <title>{ariaLabel}</title>
      {trimmed.map((d, i) => {
        const y = padding + i * (barH + barGap);
        const w = Math.max(1, Math.round((d.value / max) * innerW));
        const color = colors[i % colors.length];
        return (
          <g key={i} transform={`translate(${padding}, ${y})`}>
            <rect
              x={0}
              y={0}
              width={innerW}
              height={barH}
              fill="rgba(255,255,255,0.06)"
              rx={6}
            />
            <rect x={0} y={0} width={w} height={barH} fill={color} rx={6} />
            <text x={8} y={barH / 2 + 4} fontSize="10" fill="#0b1020">
              {d.label}
            </text>
            <text
              x={innerW - 8}
              y={barH / 2 + 4}
              fontSize="10"
              fill="#0b1020"
              textAnchor="end"
            >
              {d.value.toLocaleString()}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

type DonutDatum = { label: string; value: number };

const DonutChart: React.FC<{
  data: DonutDatum[];
  size?: number;
  thickness?: number;
  ariaLabel?: string;
}> = ({ data, size = 240, thickness = 24, ariaLabel }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let acc = 0;
  const colors = [
    "#60a5fa",
    "#a78bfa",
    "#f472b6",
    "#34d399",
    "#fbbf24",
    "#f87171",
    "#22d3ee",
    "#c084fc",
  ];

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <title>{ariaLabel}</title>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={thickness}
      />
      {data.map((d, i) => {
        const fraction = d.value / total;
        const dash = fraction * circumference;
        const gap = circumference - dash;
        const rotation = (acc / total) * 360 - 90; // start from top
        acc += d.value;
        const color = colors[i % colors.length];
        return (
          <g key={i} transform={`rotate(${rotation} ${cx} ${cy})`}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${gap}`}
              strokeLinecap="butt"
            />
          </g>
        );
      })}
      {/* Center label */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fill="#e5e7eb"
      >
        {total.toLocaleString()} views
      </text>
    </svg>
  );
};

// Color helper to keep legend and charts consistent
const chartColors = [
  "#60a5fa",
  "#a78bfa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#22d3ee",
  "#c084fc",
];
const chartBgClasses = [
  "bg-blue-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-emerald-400",
  "bg-amber-400",
  "bg-red-400",
  "bg-cyan-400",
  "bg-fuchsia-400",
];

const LegendDot: React.FC<{ index: string | number }> = ({ index }) => {
  const i =
    Math.abs(
      typeof index === "number"
        ? index
        : [...String(index)].reduce((a, c) => a + c.charCodeAt(0), 0)
    ) % chartColors.length;
  const className = chartBgClasses[i];
  return (
    <span
      aria-hidden
      className={`inline-block w-2.5 h-2.5 rounded-full ${className}`}
    />
  );
};
