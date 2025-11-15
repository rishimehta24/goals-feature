import React, { useState } from 'react';
import { Calendar, TrendingDown, Target, Users, CheckCircle, Clock, BarChart3 } from 'lucide-react';
import type { FallsReviewFormData } from '../types';

export default function FallsReviewTracker() {
  const [formData, setFormData] = useState<FallsReviewFormData>({
    homeName: '',
    reviewMonth: '',
    attendees: '',
    trendsIdentified: '',
    proposedSolutions: '',
    goals: [{ metric: '', target: '', timeframe: '', responsible: '' }],
    previousGoalsProgress: '',
    actionItems: ''
  });

  const addGoal = () => {
    setFormData({
      ...formData,
      goals: [...formData.goals, { metric: '', target: '', timeframe: '', responsible: '' }]
    });
  };

  const updateGoal = (index: number, field: keyof typeof formData.goals[0], value: string) => {
    const newGoals = [...formData.goals];
    newGoals[index] = { ...newGoals[index], [field]: value };
    setFormData({ ...formData, goals: newGoals });
  };

  const removeGoal = (index: number) => {
    const newGoals = formData.goals.filter((_, i) => i !== index);
    setFormData({ ...formData, goals: newGoals });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    alert('Review submitted successfully! (This is a demo - actual submission would save to backend)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Monthly Falls Review & Goal Tracker</h1>
                  <p className="text-blue-100">Document trends, set measurable goals, and drive accountability</p>
                </div>
                <Clock className="w-16 h-16 opacity-80" />
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-10">
              {/* Meeting Info Section */}
              <section>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold text-blue-900 mb-1">Meeting Information</h2>
                      <p className="text-sm text-blue-800">Start by identifying your facility and review period</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Home Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.homeName}
                      onChange={(e) => setFormData({...formData, homeName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your facility name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Month <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      value={formData.reviewMonth}
                      onChange={(e) => setFormData({...formData, reviewMonth: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Attendees <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.attendees}
                      onChange={(e) => setFormData({...formData, attendees: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Director of Care, DON, Program Lead, Quality Improvement Lead, etc."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">List the team members who participated in this review</p>
                  </div>
                </div>
              </section>

              <hr className="border-gray-200" />

              {/* Previous Goals Progress Section */}
              <section>
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold text-indigo-900 mb-1">Previous Goals Progress</h2>
                      <p className="text-sm text-indigo-800">Review and report on the goals set in your last meeting. How did you perform?</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Progress on Last Month's Goals <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.previousGoalsProgress}
                    onChange={(e) => setFormData({...formData, previousGoalsProgress: e.target.value})}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Report on each previous goal:
• Goal: Reduce weekend falls by 30%
  Status: ACHIEVED - Reduced by 35% (from 20 to 13 falls)
  
• Goal: Zero falls in dining room during transitions
  Status: PARTIAL - Reduced from 8 to 3 falls (63% reduction)
  Challenge: Staffing shortages on weekends limited supervision
  
• Goal: Complete care plans for 5 high-risk residents
  Status: COMPLETED - All 5 updated with new interventions"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">For each goal, note if it was achieved, partially achieved, or not met, and explain why</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Accountability Check:</strong> This section ensures goals aren't just set but actually followed up on. Be honest about what worked and what didn't.
                  </p>
                </div>
              </section>

              <hr className="border-gray-200" />

              {/* Trends Section */}
              <section>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                  <div className="flex items-start">
                    <TrendingDown className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold text-orange-900 mb-1">Fall Trends Identified This Month</h2>
                      <p className="text-sm text-orange-800">What patterns did you notice in this month's fall data? Consider time of day, day of week, location, resident profiles, and contributing factors.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trends Observed <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.trendsIdentified}
                    onChange={(e) => setFormData({...formData, trendsIdentified: e.target.value})}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Example trends to document:
• 60% of falls occurred on weekends between 2-4 PM
• Increased falls in the dining room during meal transitions
• 3 residents accounted for 45% of total falls
• Falls increased by 15% compared to last month
• Most falls involved residents with dementia during wandering"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Be specific with data points, percentages, times, and locations from your platform analytics</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Reference your platform data
                  </h4>
                  <p className="text-sm text-gray-600">Pull specific metrics from your falls dashboard to support your analysis</p>
                </div>
              </section>

              <hr className="border-gray-200" />

              {/* Solutions Section */}
              <section>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold text-purple-900 mb-1">Solutions & Ideas Discussed</h2>
                      <p className="text-sm text-purple-800">What interventions and strategies did the team propose to address the identified trends?</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Solutions & Recommendations <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.proposedSolutions}
                    onChange={(e) => setFormData({...formData, proposedSolutions: e.target.value})}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Document all ideas raised by the team:
• Increase staff presence in dining room during meal transitions
• Implement weekend activity programming from 2-4 PM
• Schedule individual care conferences for high-risk residents
• Review mobility aids and ensure proper fit
• Enhance environmental rounds to check for hazards
• Provide additional training on fall prevention protocols"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Capture all proposed solutions even if not all will be implemented immediately</p>
                </div>
              </section>

              <hr className="border-gray-200" />

              {/* Goals Section */}
              <section>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                  <div className="flex items-start">
                    <Target className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold text-green-900 mb-1">Set Specific, Measurable Goals</h2>
                      <p className="text-sm text-green-800">Transform your analysis into actionable goals with clear metrics, targets, and accountability.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {formData.goals.map((goal, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-gray-900">Goal {index + 1}</h4>
                        {formData.goals.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeGoal(index)}
                            className="text-red-600 text-sm hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Specific Metric to Track <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={goal.metric}
                            onChange={(e) => updateGoal(index, 'metric', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select a metric to track...</option>
                            <optgroup label="Time-Based">
                              <option value="Falls on weekends">Falls on weekends</option>
                              <option value="Falls on weekdays">Falls on weekdays</option>
                              <option value="Falls during morning shift">Falls during morning shift (7am-3pm)</option>
                              <option value="Falls during evening shift">Falls during evening shift (3pm-11pm)</option>
                              <option value="Falls during night shift">Falls during night shift (11pm-7am)</option>
                              <option value="Falls between specific hours">Falls between specific hours (specify in target)</option>
                            </optgroup>
                            <optgroup label="Location-Based">
                              <option value="Falls in resident rooms">Falls in resident rooms</option>
                              <option value="Falls in dining room">Falls in dining room</option>
                              <option value="Falls in bathrooms">Falls in bathrooms</option>
                              <option value="Falls in hallways">Falls in hallways</option>
                              <option value="Falls in common areas">Falls in common areas</option>
                              <option value="Falls during transitions">Falls during transitions (bed/chair/toilet)</option>
                            </optgroup>
                            <optgroup label="Resident-Specific">
                              <option value="Falls for high-risk residents">Falls for high-risk residents</option>
                              <option value="Falls for repeat fallers">Falls for repeat fallers (3+ falls)</option>
                              <option value="Falls for residents with dementia">Falls for residents with dementia</option>
                              <option value="Falls for specific resident group">Falls for specific resident group (specify in target)</option>
                            </optgroup>
                            <optgroup label="Injury-Related">
                              <option value="Falls with injury">Falls with injury</option>
                              <option value="Falls with major injury">Falls with major injury</option>
                              <option value="Falls requiring hospital transfer">Falls requiring hospital transfer</option>
                            </optgroup>
                            <optgroup label="Overall Metrics">
                              <option value="Total falls">Total falls</option>
                              <option value="Fall rate per 1000 resident days">Fall rate per 1000 resident days</option>
                              <option value="Percentage of residents who fell">Percentage of residents who fell</option>
                            </optgroup>
                            <optgroup label="Custom">
                              <option value="Other (specify in target)">Other (specify in target)</option>
                            </optgroup>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target / Goal <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={goal.target}
                            onChange={(e) => updateGoal(index, 'target', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Reduce by 30%, Decrease from 12 to 8 falls, Zero falls in this location"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timeframe <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={goal.timeframe}
                            onChange={(e) => updateGoal(index, 'timeframe', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Next 30 days, By end of next quarter, Within 2 months"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Responsible Person(s) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={goal.responsible}
                            onChange={(e) => updateGoal(index, 'responsible', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Director of Care, Program Lead, Nursing Team Lead"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addGoal}
                    className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium"
                  >
                    + Add Another Goal
                  </button>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> Your goals will be tracked automatically based on your platform data. Make sure they reference specific metrics that can be measured.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-gray-200" />

              {/* Summary Section */}
              <section>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mb-6">
                  <div className="flex items-start">
                    <BarChart3 className="w-5 h-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold text-teal-900 mb-1">Action Items & Next Steps</h2>
                      <p className="text-sm text-teal-800">Summarize the key takeaways and immediate action items from this meeting.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action Items & Follow-up Tasks <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.actionItems}
                    onChange={(e) => setFormData({...formData, actionItems: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="List specific action items with owners and due dates:
• Schedule training on fall prevention for weekend staff - DOC by Nov 15
• Conduct environmental safety audit of dining room - Facilities by Nov 10
• Review and update care plans for identified high-risk residents - Nursing by Nov 20
• Follow up with physician on medication review for repeat fallers - DOC by Nov 30"
                    required
                  />
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Meeting Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Home:</span>
                      <span className="font-medium text-gray-900">{formData.homeName || 'Not entered'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Review Period:</span>
                      <span className="font-medium text-gray-900">{formData.reviewMonth || 'Not entered'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Goals Set:</span>
                      <span className="font-medium text-gray-900">{formData.goals.filter(g => g.metric).length}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-gray-900">
                        {formData.homeName && formData.reviewMonth && formData.trendsIdentified && formData.goals[0].metric 
                          ? 'Ready to Submit' 
                          : 'In Progress'}
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-6"
                >
                  Submit Monthly Review
                </button>

                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>For Chain Administrators:</strong> This completed review will be visible in your dashboard, allowing you to track which homes have completed their monthly reviews and monitor progress on their specific goals.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

