import { TopicLearningContent } from '../../types';
import { OS_LEARNING_CONTENT } from './osContent';
import { DS_LEARNING_CONTENT } from './dsContent';
import { DIGITAL_LEARNING_CONTENT } from './digitalContent';
import { DBMS_LEARNING_CONTENT } from './dbmsContent';
import { SQL_LEARNING_CONTENT } from './sqlContent';
import { JAVA_LEARNING_CONTENT } from './javaContent';
import { PYTHON_LEARNING_CONTENT } from './pythonContent';
import { NETWORKS_LEARNING_CONTENT } from './networksContent';
import { SE_LEARNING_CONTENT } from './seContent';

export const ALL_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  ...OS_LEARNING_CONTENT,
  ...DS_LEARNING_CONTENT,
  ...DIGITAL_LEARNING_CONTENT,
  ...DBMS_LEARNING_CONTENT,
  ...SQL_LEARNING_CONTENT,
  ...JAVA_LEARNING_CONTENT,
  ...PYTHON_LEARNING_CONTENT,
  ...NETWORKS_LEARNING_CONTENT,
  ...SE_LEARNING_CONTENT,
};

export function getTopicContent(topicId: string): TopicLearningContent | null {
  if (ALL_LEARNING_CONTENT[topicId]) {
    return ALL_LEARNING_CONTENT[topicId];
  }
  return null;
}
