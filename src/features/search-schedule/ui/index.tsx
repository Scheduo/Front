import { Button, Input } from "@/shared/ui";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * 검색을 위한 사이드바 컴포넌트입니다.
 * 검색어 입력 기능을 제공합니다.
 */
export const SearchSchedule = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [recentSearchKeyword, setRecentSearchKeyword] = useState<string[]>([]);

  const handleSearch = () => {
    const query = searchInputRef.current?.value.trim() || "";
    if (query) {
      const filtered = recentSearchKeyword.filter((keyword) => keyword !== query);
      const updated = [query, ...filtered].slice(0, 5);
      setRecentSearchKeyword(updated);

      localStorage.setItem("recentSearchKeyword", updated.join(","));
    }
  };

  const handleRemoveKeyword = (indexToRemove: number) => {
    setRecentSearchKeyword((prev) => {
      const updated = prev.filter((_, index) => index !== indexToRemove);
      localStorage.setItem("recentSearchKeyword", updated.join(","));
      return updated;
    });
  };

  useEffect(() => {
    const savedKeywords = localStorage.getItem("recentSearchKeyword");
    if (savedKeywords) {
      const keywords = savedKeywords.split(",").filter((keyword) => keyword.trim() !== "");
      setRecentSearchKeyword(keywords);
    }
  }, []);

  return (
    <div className="flex h-full flex-col p-2">
      <div className="mb-4 flex items-center gap-1">
        <Input
          type="text"
          ref={searchInputRef}
          placeholder="검색어를 입력하세요"
          className="w-full rounded-lg border border-grayscale-400 p-2 outline-none focus:border-transparent focus:ring-2 focus:ring-primary-main"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button type="button" variant="ghost" size="icon" onClick={handleSearch} className="group hover:bg-transparent">
          <Search className="size-6 text-grayscale-400 transition-colors group-hover:text-primary-main" />
        </Button>
      </div>

      {/* 최근 검색어 */}
      {recentSearchKeyword.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-grayscale-700 text-sm">최근 검색어</h3>
          <ul className="space-y-1">
            {recentSearchKeyword.map((keyword, index) => (
              <li key={`${index}-${keyword}`} className="group">
                <div className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-grayscale-50">
                  <button
                    type="button"
                    onClick={() => {
                      if (searchInputRef.current) {
                        searchInputRef.current.value = keyword;
                        handleSearch();
                      }
                    }}
                    className="min-w-0 flex-1 text-left text-grayscale-600 text-sm transition-colors hover:text-grayscale-900"
                  >
                    <span className="block truncate">{keyword}</span>
                  </button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveKeyword(index)}
                    className="h-6 w-6 flex-shrink-0 hover:bg-grayscale-100"
                    aria-label={`"${keyword}" 검색 기록 삭제`}
                  >
                    <X className="size-3 text-grayscale-400" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
