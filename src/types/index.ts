export interface Goal {
  metric: string;
  target: string;
  timeframe: string;
  responsible: string;
}

export interface FallsReviewFormData {
  homeName: string;
  reviewMonth: string;
  attendees: string;
  trendsIdentified: string;
  proposedSolutions: string;
  goals: Goal[];
  previousGoalsProgress: string;
  actionItems: string;
}

