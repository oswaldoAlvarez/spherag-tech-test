import { FeedbackCard } from './FeedbackCard';

type EmptyStateCardProps = {
  message: string;
  title: string;
};

export const EmptyStateCard = ({ message, title }: EmptyStateCardProps) => (
  <FeedbackCard message={message} title={title} />
);
