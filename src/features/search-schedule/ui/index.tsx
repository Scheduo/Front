import { Button, Input } from "@/shared/ui";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RecentSearchKeyword } from "./recentSearchKeyword";

/**
 * 검색을 위한 사이드바 컴포넌트입니다.
 * 검색어 입력 기능을 제공합니다.
 */
export const SearchSchedule = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [recentSearchKeyword, setRecentSearchKeyword] = useState<string[]>([]);

  const handleSearch = (keyword?: string) => {
    const query = keyword || searchInputRef.current?.value.trim() || "";
    if (query) {
      const filtered = recentSearchKeyword.filter((keyword) => keyword !== query);
      const updated = [query, ...filtered].slice(0, 5);
      setRecentSearchKeyword(updated);

      localStorage.setItem("recentSearchKeyword", updated.join(","));

      if (keyword && searchInputRef.current) {
        searchInputRef.current.value = keyword;
      }
    }
  };

  const handleRemoveKeyword = (removeKeyword: string) => {
    const updated = recentSearchKeyword.filter((val) => val !== removeKeyword);
    setRecentSearchKeyword(updated);
    localStorage.setItem("recentSearchKeyword", updated.join(","));
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
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleSearch()}
          className="group hover:bg-transparent"
        >
          <Search className="size-6 text-grayscale-400 transition-colors group-hover:text-primary-main" />
        </Button>
      </div>

      <RecentSearchKeyword
        recentKeywords={recentSearchKeyword}
        onSearchKeyword={handleSearch}
        onRemoveKeyword={handleRemoveKeyword}
      />
    </div>
  );
};
