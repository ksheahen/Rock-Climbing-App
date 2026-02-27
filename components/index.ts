// Auth Components
export { Email } from "./Email/Email";
export type { EmailProps } from "./Email/Email";
export { default as Password } from "./Password/Password";
export type { default as PasswordProps } from "./Password/Password";

// UI Components
export { Button } from "./Button/Button";
export type { ButtonProps } from "./Button/Button";
export { Header } from "./Header/Header";
export type { HeaderProps } from "./Header/Header";
export { HomeHeader } from "./HomeHeader/HomeHeader";
export type { HomeHeaderProps } from "./HomeHeader/HomeHeader";
export { Line } from "./Line/Line";
export { SettingsButton } from "./SettingsButton/SettingsButton";

// Session Components
export { RecentSessions } from "./RecentSessions/RecentSessions";
export type { RecentSessionsProps } from "./RecentSessions/RecentSessions";
export { SessionCard } from "./SessionCard/SessionCard";
export type { SessionCardProps, SessionData } from "./SessionCard/SessionCard";

// Climb Components
export { ClimbCard } from "./ClimbCard/ClimbCard";
export type { ClimbCardProps, ClimbData } from "./ClimbCard/ClimbCard";
export { RecentClimbs } from "./RecentClimbs/RecentClimbs";
export type { RecentClimbsProps } from "./RecentClimbs/RecentClimbs";

// Analytics Components
export { AnalyticsPreview } from "./AnalyticsPreview/AnalyticsPreview";
export type { AnalyticsPreviewProps } from "./AnalyticsPreview/AnalyticsPreview";
export { DaySelector } from "./DaySelector/DaySelector";
export type { DayData, DaySelectorProps } from "./DaySelector/DaySelector";
export { FilterModal } from "./FilterModal/FilterModal";
export type {
  FilterModalProps,
  FilterOptions,
} from "./FilterModal/FilterModal";
export { PointsDisplay } from "./PointsDisplay/PointsDisplay";
export type { PointsDisplayProps } from "./PointsDisplay/PointsDisplay";

// Profile Components
export { ClimbHistory } from "./ClimbHistory/ClimbHistory";
export { ProfileInfo } from "./ProfileInfo/ProfileInfo";
export { TimeframeFilter } from "./TimeframeFilter/TimeframeFilter";

// Log Components
export { Attempt } from "./Attempt/Attempt";
export { Category } from "./Category/Category";
export { Complete } from "./Complete/Complete";
export { default as DateTime } from "./DateTime/DateTime";
export { default as Description } from "./Description/Description";
export { Difficulty } from "./Difficulty/Difficulty";
export { default as Media } from "./Media/Media";
export { Rating } from "./Rating/Rating";
export { Type } from "./Type/Type";
