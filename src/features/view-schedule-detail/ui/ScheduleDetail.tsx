import { Bell, Clock, Edit2, MapPin, Repeat, User } from "lucide-react";
import { useScheduleDetail } from "@/entities/schedule";
import { useCurrentCalendarId } from "@/shared/lib";
import { Button, ScrollArea } from "@/shared/ui";

interface ScheduleDetailProps {
  scheduleId?: number;
  onEdit: (scheduleData?: any) => void;
  onCancel: () => void;
}

/**
 * 일정 상세 정보를 보여주는 컴포넌트입니다.
 */
export const ScheduleDetail = ({ scheduleId, onEdit, onCancel }: ScheduleDetailProps) => {
  const calendarId = useCurrentCalendarId();

  // 일정 상세 정보 조회
  const {
    data: scheduleDetail,
    isLoading,
    error,
  } = useScheduleDetail(calendarId ?? 0, scheduleId ?? 0, {
    enabled: !!calendarId && !!scheduleId,
  });

  if (!calendarId || !scheduleId) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-grayscale-400 text-medium-m">일정을 선택해주세요.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-grayscale-400 text-medium-m">로딩 중...</div>
      </div>
    );
  }

  if (error || !scheduleDetail) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-grayscale-400 text-medium-m">일정을 불러올 수 없습니다.</div>
      </div>
    );
  }

  const formatDateTime = (dateTime?: string, date?: string, isAllDay?: boolean) => {
    if (isAllDay && date) {
      return new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    if (dateTime) {
      return new Date(dateTime).toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "";
  };

  const getNotificationText = (notificationTime?: string) => {
    switch (notificationTime) {
      case "ONE_DAY_BEFORE":
        return "1일 전";
      case "ONE_HOUR_BEFORE":
        return "1시간 전";
      case "THIRTY_MINUTES_BEFORE":
        return "30분 전";
      case "FIVE_MINUTES_BEFORE":
        return "5분 전";
      default:
        return "없음";
    }
  };

  const getCategoryColor = (color: string) => {
    const colorMap = {
      RED: "bg-red-500",
      BLUE: "bg-blue-500",
      GREEN: "bg-green-500",
      YELLOW: "bg-yellow-500",
      PURPLE: "bg-purple-500",
      ORANGE: "bg-orange-500",
      PINK: "bg-pink-500",
      GRAY: "bg-gray-500",
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-500";
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 border-grayscale-100 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-bold-l text-grayscale-black">일정 상세</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(scheduleDetail)}
            className="h-8 w-8 p-0"
            aria-label="수정"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6 p-6">
          {/* 제목 */}
          <div>
            <h3 className="mb-2 text-bold-xl text-grayscale-black">{scheduleDetail.title}</h3>
          </div>

          {/* 시간 정보 */}
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 text-grayscale-500" />
            <div>
              <div className="text-grayscale-black text-medium-m">{scheduleDetail.allDay ? "하루 종일" : "시간"}</div>
              <div className="mt-1 text-grayscale-600 text-regular-s">
                {scheduleDetail.allDay ? (
                  <>
                    {formatDateTime(undefined, scheduleDetail.startDate, true)}
                    {scheduleDetail.startDate !== scheduleDetail.endDate && (
                      <> ~ {formatDateTime(undefined, scheduleDetail.endDate, true)}</>
                    )}
                  </>
                ) : (
                  <>
                    {formatDateTime(scheduleDetail.startDateTime)}
                    <br />
                    {formatDateTime(scheduleDetail.endDateTime)}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 장소 */}
          {scheduleDetail.location && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-grayscale-500" />
              <div>
                <div className="text-grayscale-black text-medium-m">장소</div>
                <div className="mt-1 text-grayscale-600 text-regular-s">{scheduleDetail.location}</div>
              </div>
            </div>
          )}

          {/* 카테고리 */}
          <div className="flex items-start gap-3">
            <User className="mt-0.5 h-5 w-5 text-grayscale-500" />
            <div>
              <div className="text-grayscale-black text-medium-m">카테고리</div>
              <div className="mt-1 flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${getCategoryColor(scheduleDetail.category.color)}`} />
                <span className="text-grayscale-600 text-regular-s">{scheduleDetail.category.name}</span>
              </div>
            </div>
          </div>

          {/* 알림 */}
          {scheduleDetail.notificationTime && (
            <div className="flex items-start gap-3">
              <Bell className="mt-0.5 h-5 w-5 text-grayscale-500" />
              <div>
                <div className="text-grayscale-black text-medium-m">알림</div>
                <div className="mt-1 text-grayscale-600 text-regular-s">
                  {getNotificationText(scheduleDetail.notificationTime)}
                </div>
              </div>
            </div>
          )}

          {/* 반복 */}
          {scheduleDetail.recurrence && (
            <div className="flex items-start gap-3">
              <Repeat className="mt-0.5 h-5 w-5 text-grayscale-500" />
              <div>
                <div className="text-grayscale-black text-medium-m">반복</div>
                <div className="mt-1 text-grayscale-600 text-regular-s">
                  {scheduleDetail.recurrence.frequency}
                  <br />
                  {scheduleDetail.recurrence.recurrenceEndDate}까지
                </div>
              </div>
            </div>
          )}

          {/* 메모 */}
          {scheduleDetail.memo && (
            <div>
              <div className="mb-2 text-grayscale-black text-medium-m">메모</div>
              <div className="rounded-lg bg-grayscale-50 p-3 text-grayscale-600 text-regular-s">
                {scheduleDetail.memo}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex-shrink-0 border-grayscale-100 border-t p-6">
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            닫기
          </Button>
          <Button onClick={() => onEdit(scheduleDetail)} className="flex-1">
            수정
          </Button>
        </div>
      </div>
    </div>
  );
};
