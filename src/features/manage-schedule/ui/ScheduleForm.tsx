import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import {
  Button,
  ButtonGroup,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/shared/ui";

import { NOTIFICATION_OPTIONS, RECURRENCE_OPTIONS } from "../consts";
import type { NotificationTime, ScheduleFormData, ScheduleRequest } from "../lib";
import { TimePicker } from "./TimePicker";

interface ScheduleFormProps {
  initialData?: Partial<ScheduleFormData>;
  onSubmit: (data: ScheduleRequest) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
}

/**
 * 일정 생성/수정을 위한 폼 컴포넌트입니다.
 * 초기 데이터 여부에 따라 생성/수정 모드로 사용할 수 있습니다.
 */
export const ScheduleForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitButtonText = "저장",
}: ScheduleFormProps) => {
  const form = useForm<ScheduleFormData>({
    defaultValues: {
      title: initialData?.title || "",
      isAllDay: initialData?.isAllDay || false,
      startDate: initialData?.startDate || "",
      startTime: initialData?.startTime || "",
      endDate: initialData?.endDate || "",
      endTime: initialData?.endTime || "",
      location: initialData?.location || "",
      category: initialData?.category || "",
      memo: initialData?.memo || "",
      hasNotification: initialData?.hasNotification || false,
      notificationTime: initialData?.notificationTime || "FIVE_MINUTES_BEFORE",
      hasRecurrence: initialData?.hasRecurrence || false,
      recurrenceRule: initialData?.recurrenceRule || "DAILY",
      recurrenceEndDate: initialData?.recurrenceEndDate || "",
    },
  });

  const isAllDay = form.watch("isAllDay");
  const hasNotification = form.watch("hasNotification");
  const hasRecurrence = form.watch("hasRecurrence");
  const selectedNotificationTime = form.watch("notificationTime");

  const handleNotificationTimeSelect = (time: NotificationTime) => {
    form.setValue("notificationTime", time);
  };

  const onFormSubmit = (data: ScheduleFormData) => {
    const requestData: ScheduleRequest = {
      title: data.title,
      isAllDay: data.isAllDay,
      startDate: data.startDate,
      endDate: data.endDate,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      category: data.category,
      memo: data.memo,
      notificationTime: data.hasNotification ? data.notificationTime : null,
      recurrence: data.hasRecurrence
        ? {
            recurrenceRule: data.recurrenceRule,
            recurrenceEndDate: data.recurrenceEndDate,
          }
        : null,
    };

    onSubmit(requestData);
  };

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="min-h-0 flex-1 px-3 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-3">
            {/* 일정 제목 */}
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "일정 제목은 필수입니다" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-grayscale-700 text-medium-m">일정 제목</FormLabel>
                  <FormControl>
                    <input
                      placeholder="일정 제목을 입력하세요"
                      className="w-full rounded-md border border-grayscale-400 px-3 py-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-main"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-medium-s text-notification-strong" />
                </FormItem>
              )}
            />

            {/* 하루 종일 스위치 */}
            <FormField
              control={form.control}
              name="isAllDay"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-grayscale-700 text-medium-m">하루 종일</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* 시작 날짜 */}
            <FormField
              control={form.control}
              name="startDate"
              rules={{ required: "시작 날짜는 필수입니다" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-grayscale-700 text-medium-m">시작 날짜</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(new Date(field.value), "yyyy/MM/dd", { locale: ko })
                            : "시작 날짜를 선택하세요"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(format(date, "yyyy-MM-dd"));
                            }
                          }}
                          locale={ko}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage className="text-medium-s text-notification-strong" />
                </FormItem>
              )}
            />

            {/* 시작 시간 */}
            {!isAllDay && (
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">시작 시간</FormLabel>
                    <FormControl>
                      <TimePicker value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage className="text-medium-s text-notification-strong" />
                  </FormItem>
                )}
              />
            )}

            {/* 종료 날짜 */}
            <FormField
              control={form.control}
              name="endDate"
              rules={{ required: "종료 날짜는 필수입니다" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-grayscale-700 text-medium-m">종료 날짜</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(new Date(field.value), "yyyy/MM/dd", { locale: ko })
                            : "종료 날짜를 선택하세요"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(format(date, "yyyy-MM-dd"));
                            }
                          }}
                          locale={ko}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage className="text-medium-s text-notification-strong" />
                </FormItem>
              )}
            />

            {/* 종료 시간 */}
            {!isAllDay && (
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">종료 시간</FormLabel>
                    <FormControl>
                      <TimePicker value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage className="text-medium-s text-notification-strong" />
                  </FormItem>
                )}
              />
            )}

            {/* 장소 */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-grayscale-700 text-medium-m">장소</FormLabel>
                  <FormControl>
                    <input
                      placeholder="장소를 입력하세요"
                      className="w-full rounded-md border border-grayscale-400 px-3 py-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-main"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-medium-s text-notification-strong" />
                </FormItem>
              )}
            />

            {/* 카테고리 */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-grayscale-700 text-medium-m">카테고리</FormLabel>
                  <FormControl>
                    <input
                      placeholder="업무, 취미, 약속 등"
                      className="w-full rounded-md border border-grayscale-400 px-3 py-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-main"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-medium-s text-notification-strong" />
                </FormItem>
              )}
            />

            {/* 메모 */}
            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-grayscale-700 text-medium-m">메모</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="메모를 입력하세요"
                      rows={3}
                      className="w-full resize-none rounded-md border border-grayscale-400 px-3 py-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-main"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-medium-s text-notification-strong" />
                </FormItem>
              )}
            />

            {/* 알림 설정 */}
            <FormField
              control={form.control}
              name="hasNotification"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-grayscale-700 text-medium-m">알림</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* 알림 시간 선택 */}
            {hasNotification && (
              <div className="flex flex-wrap gap-2">
                {NOTIFICATION_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleNotificationTimeSelect(option.value)}
                    className={`rounded-md border px-3 py-1 text-xs transition-colors ${
                      selectedNotificationTime === option.value
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-grayscale-400 bg-white text-grayscale-700 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {/* 일정 반복 */}
            <FormField
              control={form.control}
              name="hasRecurrence"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-grayscale-700 text-medium-m">일정 반복</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* 반복 규칙 */}
            {hasRecurrence && (
              <>
                <FormField
                  control={form.control}
                  name="recurrenceRule"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {RECURRENCE_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-medium-s text-notification-strong" />
                    </FormItem>
                  )}
                />

                {/* 반복 종료일 */}
                <FormField
                  control={form.control}
                  name="recurrenceEndDate"
                  rules={{
                    required: hasRecurrence ? "반복 종료일은 필수입니다" : false,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-grayscale-700 text-medium-m">반복 종료일</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(new Date(field.value), "yyyy년 MM월 dd일", { locale: ko })
                                : "반복 종료일을 선택하세요"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => {
                                if (date) {
                                  field.onChange(format(date, "yyyy-MM-dd"));
                                }
                              }}
                              locale={ko}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage className="text-medium-s text-notification-strong" />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* 하단 여백을 위한 빈 공간 */}
            <div className="h-4" />
          </form>
        </Form>
      </ScrollArea>

      {/* 하단 버튼 그룹 */}
      <ButtonGroup
        leftText={isSubmitting ? "저장 중..." : submitButtonText}
        onLeftClick={form.handleSubmit(onFormSubmit)}
        leftDisabled={isSubmitting}
        rightText="취소"
        onRightClick={onCancel}
      />
    </div>
  );
};
