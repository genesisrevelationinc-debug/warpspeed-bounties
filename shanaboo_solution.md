 ```diff
--- /dev/null
+++ b b/src/components/Poll/Poll.types.ts
@@ -0,0 +1,56 @@
+export interface PollOption {
+  id: string;
+  text: string;
+  voteCount: number;
+  voters: Voter[];
+}
+
+export interface Voter {
+  id: string;
+  name: string;
+  avatar?: string;
+}
+
+export interface Poll {
+  id: string;
+  question: string;
+  options: PollOption[];
+  isMultipleChoice: boolean;
+  totalParticipants: number;
+  createdAt: string;
+  createdBy: Voter;
+  expiresAt?: string;
+  isExpired: boolean;
+}
+
+export interface PollCreationData {
+  question: string;
+  options: string[];
+  isMultipleChoice: boolean;
+}
+
+export interface PollVoteData {
+  pollId: string;
+  optionIds: string[];
+}
+
+export interface PollProps {
+  poll: Poll;
+  currentUserId: string;
+  onVote: (optionIds: string[]) => void;
+  onViewVotes: () => void;
+}
+
+export interface PollCreationProps {
+  onCreatePoll: (data: PollCreationData) => void;
+  onCancel: () => void;
+  maxOptions?: number;
+  maxQuestionLength?: number;
+}
+
+export interface PollVotesBottomSheetProps {
+  poll: Poll;
+  isVisible: boolean;
+  onClose: () => void;
+}
+
--- /dev/null
+++ b b/src/components/Poll/Poll.styles.ts
@@ -0,0 +1,232 @@
+import { StyleSheet } from 'react-native';
+
+export const pollStyles = StyleSheet.create({
+  container: {
+    backgroundColor: '#FFFFFF',
+    borderRadius: 12,
+    padding: 16,
+    marginVertical: 8,
+    shadowColor: '#000',
+    shadowOffset: { width: 0, height: 1 },
+    shadowOpacity: 0.1,
+    shadowRadius: 2,
+    elevation: 2,
+  },
+  header: {
+    flexDirection: 'row',
+    justifyContent: 'space-between',
+    alignItems: 'flex-start',
+    marginBottom: 12,
+  },
+  question: {
+    fontSize: 16,
+    fontWeight: '600',
+    color: '#1A1A1A',
+    flex: 1,
+    lineHeight: 22,
+  },
+  badge: {
+    backgroundColor: '#E8F0FE',
+    borderRadius: 4,
+    paddingHorizontal: 8,
+    paddingVertical: 2,
+    marginLeft: 8,
+  },
+  badgeText: {
+    fontSize: 11,
+    fontWeight: '500',
+    color: '#1A73E8',
+  },
+  optionsContainer: {
+    marginTop: 8,
+  },
+  option: {
+    marginBottom: 10,
+  },
+  optionButton: {
+    flexDirection: 'row',
+    alignItems: 'center',
+    paddingVertical: 10,
+    paddingHorizontal: 12,
+    borderRadius: 8,
+    backgroundColor: '#F5F5F5',
+    minHeight: 44,
+  },
+  optionButtonSelected: {
+    backgroundColor: '#E8F0FE',
+    borderWidth: 1,
+    borderColor: '#1A73E8',
+  },
+  optionButtonVoted: {
+    backgroundColor: '#F0F7FF',
+  },
+  optionRadio: {
+    width: 20,
+    height: 20,
+    borderRadius: 10,
+    borderWidth: 2,
+    borderColor: '#9E9E9E',
+    marginRight: 10,
+    justifyContent: 'center',
+    alignItems: 'center',
+  },
+  optionRadioSelected: {
+    borderColor: '#1A73E8',
+  },
+  optionRadioInner: {
+    width: 10,
+    height: 10,
+    borderRadius: 5,
+    backgroundColor: '#1A73E8',
+  },
+  optionCheckbox: {
+    width: 20,
+    height: 20,
+    borderRadius: 4,
+    borderWidth: 2,
+    borderColor: '#9E9E9E',
+    marginRight: 10,
+    justifyContent: 'center',
+    alignItems: 'center',
+  },
+  optionCheckboxSelected: {
+    borderColor: '#1A73E8',
+    backgroundColor: '#1A73E8',
+  },
+  optionText: {
+    fontSize: 14,
+    color: '#333333',
+    flex: 1,
+  },
+  optionTextSelected: {
+    fontWeight: '500',
+    color: '#1A73E8',
+  },
+  progressBarContainer: {
+    height: 8,
+    backgroundColor: '#E0E0E0',
+    borderRadius: 4,
+    marginTop: 6,
+    overflow: 'hidden',
+  },
+  progressBar: {
+    height: '100%',
+    borderRadius: 4,
+  },
+  resultsContainer: {
+    marginTop: 4,
+  },
+  resultRow: {
+    flexDirection: 'row',
+    justifyContent: 'space-between',
+    alignItems: 'center',
+    marginTop: 4,
+  },
+  resultPercentage: {
+    fontSize: 12,
+    fontWeight: '600',
+    color: '#666666',
+  },
+  resultCount: {
+    fontSize: 12,
+    color: '#999999',
+  },
+  footer: {
+    flexDirection: 'row',
+    justifyContent: 'space-between',
+    alignItems: 'center',
+    marginTop: 12,
+    paddingTop: 12,
+    borderTopWidth: 1,
+    borderTopColor: '#EEEEEE',
+  },
+  totalVotes: {
+    fontSize: 12,
+    color: '#999999',
+  },
+  viewVotesButton: {
+    paddingVertical: 4,
+    paddingHorizontal: 8,
+  },
+  viewVotesText: {
+    fontSize: 13,
+    fontWeight: '500',
+    color: '#1A73E8',
+  },
+