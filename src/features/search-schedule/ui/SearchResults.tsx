import type { SearchResultItem } from "./types";

interface SearchResultsProps {
  results: SearchResultItem[];
  isLoading?: boolean;
}

/**
 * 검색 결과를 표시하는 컴포넌트입니다.
 * 일정 검색 결과를 목록 형태로 보여줍니다.
 */
export const SearchResults = ({ results, isLoading = false }: SearchResultsProps) => {
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="space-y-2">
      <div className="text-bold-m text-grayscale-black">검색 결과 {results.length > 0 && `(${results.length}개)`}</div>

      {results.length === 0 ? (
        <div className="py-3 text-center">
          <p className="text-grayscale-700 text-medium-r">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {results.map((result) => (
            <li key={result.scheduleId}>
              <div className="cursor-pointer rounded-lg border border-grayscale-300 p-3 text-grayscale-700 transition-colors hover:bg-grayscale-100">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-medium-r">{result.title}</div>
                    <div className="text-medium-s">{result.calendarName}</div>
                  </div>
                  <div className="flex items-center justify-between text-medium-s">
                    <span>
                      {result.startDate}~{result.endDate}
                    </span>
                    <span>
                      {result.startTime}~{result.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
