 ```diff
--- /dev/null
+++ b/src/components/Poll/Poll.styles.ts
@@ -0,0 +1,234 @@
+import { StyleSheet } from 'react-native';
+
+export const pollStyles = StyleSheet.create({
+  container: {
+    backgroundColor: '#FFFFFF',
+    borderRadius: 12,
+    padding: 12,
+    marginVertical: 4,
+    maxWidth: '80%',
+    shadowColor: '#000',
+    shadowOffset: { width: 0, height: 1 },
+    shadowOpacity: 0.1,
+    shadowRadius: 2,
+    elevation: 2,
+  },
+  ownPoll: {
+    backgroundColor: '#DCF8C6',
+  },
+  otherPoll: {
+    backgroundColor: '#FFFFFF',
+  },
+  question: {
+    fontSize: 15,
+    fontWeight: '600',
+    color: '#1A1A1A',
+    marginBottom: 8,
+    lineHeight: 20,
+  },
+  optionsList: {
+    gap: 8,
+  },
+  optionContainer: {
+    position: 'relative',
+    borderRadius: 8,
+    overflow: 'hidden',
+    minHeight: 40,
+    justifyContent: 'center',
+  },
+  optionBackground: {
+    position: 'absolute',
+    top: 0,
+    left: 0,
+    bottom: 0,
+    backgroundColor: '#E3F2FD',
+    borderRadius: 8,
+  },
+  optionContent: {
+    flexDirection: 'row',
+    alignItems: 'center',
+    paddingHorizontal: 12,
+    paddingVertical: 10,
+    zIndex: 1,
+  },
+  optionText: {
+    fontSize: 14,
+    color: '#1A1A1A',
+    flex: 1,
+  },
+  optionTextVoted: {
+    fontWeight: '600',
+  },
+  percentageText: {
+    fontSize: 13,
+    color: '#666666',
+    marginLeft: 8,
+  },
+  checkmark: {
+    marginLeft: 6,
+    color: '#4CAF50',
+    fontSize: 14,
+    fontWeight: '700',
+  },
+  footer: {
+    flexDirection: 'row',
+    justifyContent: 'space-between',
+    alignItems: 'center',
+    marginTop: 10,
+    paddingTop: 8,
+    borderTopWidth: 1,
+    borderTopColor: '#E0E0E0',
+  },
+  votesCount: {
+    fontSize: 12,
+    color: '#888888',
+  },
+  viewVotesButton: {
+    paddingVertical: 4,
+    paddingHorizontal: 8,
+  },
+  viewVotesText: {
+    fontSize: 13,
+    color: '#2196F3',
+    fontWeight: '600',
+  },
+  multipleChoiceBadge: {
+    position: 'absolute',
+    top: 8,
+    right: 8,
+    backgroundColor: '#FF9800',
+    borderRadius: 4,
+    paddingHorizontal: 6,
+    paddingVertical: 2,
+  },
+  multipleChoiceText: {
+    fontSize: 10,
+    color: '#FFFFFF',
+    fontWeight: '600',
+  },
+});
+
+export const pollCreationStyles = StyleSheet.create({
+  container: {
+    backgroundColor: '#FFFFFF',
+    borderRadius: 16,
+    padding: 16,
+    marginHorizontal: 16,
+    marginVertical: 8,
+  },
+  title: {
+    fontSize: 18,
+    fontWeight: '700',
+    color: '#1A1A1A',
+    marginBottom: 16,
+  },
+  questionInput: {
+    borderWidth: 1,
+    borderColor: '#E0E0E0',
+    borderRadius: 8,
+    padding: 12,
+    fontSize: 15,
+    color: '#1A1A1A',
+    minHeight: 48,
+    marginBottom: 12,
+  },
+  optionsContainer: {
+    gap: 8,
+    marginBottom: 12,
+  },
+  optionInput: {
+    borderWidth: 1,
+    borderColor: '#E0E0E0',
+    borderRadius: 8,
+    padding: 12,
+    fontSize: 14,
+    color: '#1A1A1A',
+    flex: 1,
+  },
+  optionRow: {
+    flexDirection: 'row',
+    alignItems: 'center',
+    gap: 8,
+  },
+  addOptionButton: {
+    flexDirection: 'row',
+    alignItems: 'center',
+    paddingVertical: 10,
+    paddingHorizontal: 12,
+    borderRadius: 8,
+    borderWidth: 1,
+    borderColor: '#2196F3',
+    borderStyle: 'dashed',
+    justifyContent: 'center',
+  },
+  addOptionText: {
+    fontSize: 14,
+    color: '#2196F3',
+    fontWeight: '600',
+    marginLeft: 6,
+  },
+  settingsRow: {
+    flexDirection: 'row',
+    alignItems: 'center',
+    justifyContent: 'space-between',
+    marginBottom: 16,
+  },
+  settingsLabel: {
+    fontSize: 14,
+    color: '#1A1A1A',
+  },
+  createButton: {
+    backgroundColor: '#2196F3',
+    borderRadius: 8,
+    paddingVertical: 14,
+    alignItems: 'center',
+  },
+  createButtonDisabled: {
+    backgroundColor: '#BDBDBD',
+  },
+  createButtonText: {
+    fontSize: 16,
+    fontWeight: '600',
+    color: '#FFFFFF',
+  },
+  charCount: {
+    fontSize: 12,
+    color: '#888888',
+    textAlign: 'right',
+    marginBottom: 8,
+  },
+  removeOptionButton: {
+    padding: 4,
+  },
+  removeOptionText: {
+    fontSize: 18,
+    color: '#F44336',
+    fontWeight: '600',
+  },
