import type { CalendarParticipant, CalendarRole, ScheduleCalendar } from "@/entities/calendar";
import {
  Button,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ROLE_OPTIONS } from "../consts";

type CalendarFormData = Omit<ScheduleCalendar, "id">;

interface CalendarFormDialogProps {
  mode: "create" | "edit";
  initialData?: Partial<ScheduleCalendar>;
  onSubmit: (data: CalendarFormData) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
}

/**
 * 캘린더 생성/편집 폼 다이얼로그 컴포넌트입니다.
 * 캘린더 이름 설정과 참가자 초대 기능을 제공합니다.
 */
export const CalendarFormDialog = ({ mode, initialData, onSubmit, onCancel, onDelete }: CalendarFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [participants, setParticipants] = useState<CalendarParticipant[]>(initialData?.participants || []);

  const form = useForm<CalendarFormData>({
    defaultValues: {
      name: initialData?.name || "",
      participants: initialData?.participants || [],
    },
    mode: "onChange",
  });

  const handleInvite = () => {
    if (!emailInput.trim()) return;

    const emails = emailInput
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    const newParticipants = emails
      .filter((email) => email && !participants.find((participant) => participant.email === email))
      .map(
        (email): CalendarParticipant => ({
          id: Date.now() + Math.random(),
          email,
          nickname: email,
          role: "VIEWER",
        }),
      );

    setParticipants((prev) => [...prev, ...newParticipants]);
    setEmailInput("");
  };

  const handleRoleChange = (participantId: number, role: CalendarRole) => {
    setParticipants((prev) =>
      prev.map((participant) => (participant.id === participantId ? { ...participant, role } : participant)),
    );
  };

  const handleRemoveParticipant = (participantId: number) => {
    setParticipants((prev) => prev.filter((participant) => participant.id !== participantId));
  };

  const handleSubmit = async (data: CalendarFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: data.name,
        participants,
      });
    } catch (error) {
      console.error("캘린더 저장 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setParticipants(initialData?.participants || []);
    setEmailInput("");
    onCancel();
  };

  return (
    <DialogContent className="flex max-h-[90vh] max-w-md flex-col" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>{mode === "create" ? "캘린더 생성" : "캘린더 편집"}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex h-full flex-col space-y-6">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "캘린더 이름을 입력해주세요" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>캘린더 이름</FormLabel>
                <FormControl>
                  <Input placeholder="캘린더 이름을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex min-h-0 flex-1 flex-col space-y-4">
            <FormLabel>참가자</FormLabel>

            <div className="flex gap-2">
              <Input
                placeholder="이메일을 쉼표로 구분하여 입력하세요"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleInvite();
                  }
                }}
              />
              <Button type="button" onClick={handleInvite} disabled={!emailInput.trim()} size="sm">
                초대
              </Button>
            </div>

            {participants.length > 0 && (
              <ScrollArea
                className={`w-full ${participants.length <= 3 ? `h-[${participants.length * 20}px]` : "h-[216px]"}`}
              >
                <div className="space-y-3 pr-1">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-2 py-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {participant.nickname}
                          {participant.role === "OWNER" && (
                            <span className="ml-1 text-muted-foreground text-xs">(소유자)</span>
                          )}
                        </div>
                        <div className="text-muted-foreground text-xs">{participant.email}</div>
                      </div>

                      <Select
                        value={participant.role}
                        onValueChange={(value) => handleRoleChange(participant.id, value as CalendarRole)}
                      >
                        <SelectTrigger className="h-8 w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveParticipant(participant.id)}
                        className="text-grayscale-400 hover:bg-transparent"
                        disabled={participant.role === "OWNER"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {mode === "edit" && onDelete && (
            <div className="border-t pt-4">
              <Button type="button" variant="destructive" className="w-full" onClick={onDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                캘린더 삭제
              </Button>
            </div>
          )}

          <DialogFooter className="flex-shrink-0">
            <Button type="button" variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : mode === "create" ? "생성" : "저장"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
