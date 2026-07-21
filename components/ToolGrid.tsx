"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { getRecentTools } from "@/lib/recentTools";
import {
  getPinnedTools,
  getToolPinId,
  togglePinnedTool,
} from "@/lib/pinnedTools";
import {
  ALL_TOOL_ENTRIES,
  ROUTE_TOOL_ENTRIES,
  TOOL_CATEGORIES,
  filterToolEntries,
  type ToolCategory,
  type ToolGridEntry,
} from "@/lib/toolsCatalog";

type ToolGridProps = {
  showChangelogBadge: boolean;
  onOpenChangelog: () => void;
};

function ToolCard({
  item,
  pinned,
  onTogglePin,
  onOpenHealth,
  onOpenSettings,
}: {
  item: ToolGridEntry;
  pinned: boolean;
  onTogglePin: (id: string) => void;
  onOpenHealth: () => void;
  onOpenSettings: () => void;
}) {
  const pinId = getToolPinId(item);

  const cardInner = (
    <>
      {pinId ? (
        <button
          type="button"
          aria-label={pinned ? `Unpin ${item.name}` : `Pin ${item.name}`}
          aria-pressed={pinned}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onTogglePin(pinId);
          }}
          className="absolute top-2 left-2 z-10 text-base leading-none p-0.5 rounded hover:scale-110 transition-transform"
          title={pinned ? "Unpin" : "Pin to favorites"}
        >
          {pinned ? "★" : "☆"}
        </button>
      ) : null}
      {"badge" in item && item.badge && (
        <span
          className={`absolute top-2 right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
            item.badge === "Popular"
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
              : "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
          }`}
        >
          {item.badge}
        </span>
      )}
      <div className="font-medium text-page">{item.name}</div>
      <div className="text-xs text-page/70 mt-1">{item.desc}</div>
    </>
  );
  const cardClass =
    "tool-card relative text-left p-3 rounded-lg block w-full cursor-pointer";

  if (item.type === "route") {
    return (
      <Link key={item.name} href={`/${item.slug}`} className={cardClass}>
        {cardInner}
      </Link>
    );
  }
  if (item.type === "open-health") {
    return (
      <button
        key={item.name}
        type="button"
        className={cardClass}
        onClick={onOpenHealth}
      >
        {cardInner}
      </button>
    );
  }
  return (
    <button
      key={item.name}
      type="button"
      className={cardClass}
      onClick={onOpenSettings}
    >
      {cardInner}
    </button>
  );
}

export function ToolGrid({ showChangelogBadge, onOpenChangelog }: ToolGridProps) {
  const { setHealthDashboardOpen, requestOpenSettingsFab } = useAppStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolCategory | "all">("all");
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  useEffect(() => {
    setRecentSlugs(getRecentTools());
    setPinnedIds(getPinnedTools());
  }, []);

  const handleTogglePin = (id: string) => {
    togglePinnedTool(id);
    setPinnedIds(getPinnedTools());
  };

  const pinnedEntries = useMemo(() => {
    return pinnedIds
      .map((id) => ALL_TOOL_ENTRIES.find((t) => getToolPinId(t) === id))
      .filter((t): t is ToolGridEntry => Boolean(t));
  }, [pinnedIds]);

  const recentEntries = useMemo(() => {
    return recentSlugs
      .map((slug) => ROUTE_TOOL_ENTRIES.find((t) => t.slug === slug))
      .filter((t): t is Extract<ToolGridEntry, { type: "route" }> => Boolean(t));
  }, [recentSlugs]);

  const filtered = useMemo(
    () => filterToolEntries(ALL_TOOL_ENTRIES, query, category),
    [query, category],
  );

  const showPinned = pinnedEntries.length > 0 && !query && category === "all";
  const showRecent = recentEntries.length > 0 && !query && category === "all";

  return (
    <div className="space-y-4">
      {showPinned && (
        <div className="bg-card rounded-xl shadow-md p-4 border border-card">
          <h2 className="text-lg font-semibold text-page mb-3">Pinned</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {pinnedEntries.map((item) => (
              <ToolCard
                key={getToolPinId(item) ?? item.name}
                item={item}
                pinned
                onTogglePin={handleTogglePin}
                onOpenHealth={() => setHealthDashboardOpen(true)}
                onOpenSettings={() => requestOpenSettingsFab()}
              />
            ))}
          </div>
        </div>
      )}

      {showRecent && (
        <div className="bg-card rounded-xl shadow-md p-4 border border-card">
          <h2 className="text-lg font-semibold text-page mb-3">Recently used</h2>
          <div className="flex flex-wrap gap-2">
            {recentEntries.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="px-3 py-1.5 rounded-full text-sm bg-page/10 text-page hover:bg-page/15 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl shadow-md p-6 border border-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-2xl font-bold text-page">All Tools</h2>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            aria-label="Search tools"
            className="w-full sm:max-w-xs px-3 py-2 rounded-lg border border-card bg-page/5 text-page text-sm placeholder:text-page/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Tool categories">
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={category === cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                category === cat.id
                  ? "text-white"
                  : "bg-page/10 text-page/80 hover:bg-page/15"
              }`}
              style={
                category === cat.id
                  ? { background: "var(--accent-color)" }
                  : undefined
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-page/60 py-8 text-sm">
            No tools match your search. Try a different keyword or category.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((item) => {
              const pinId = getToolPinId(item);
              return (
                <ToolCard
                  key={item.name}
                  item={item}
                  pinned={pinId ? pinnedIds.includes(pinId) : false}
                  onTogglePin={handleTogglePin}
                  onOpenHealth={() => setHealthDashboardOpen(true)}
                  onOpenSettings={() => requestOpenSettingsFab()}
                />
              );
            })}
          </div>
        )}

        {showChangelogBadge && (
          <div className="text-center mt-4">
            <button
              type="button"
              id="changelog-trigger"
              onClick={onOpenChangelog}
              className="py-1.5 px-3 rounded-full text-white text-xs font-bold cursor-pointer border-none transition-opacity hover:opacity-90"
              style={{ background: "var(--accent-color)" }}
            >
              What&apos;s New in v2.1? ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
