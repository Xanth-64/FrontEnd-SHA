import { z } from 'zod';

const LearningContentEditionSchema = z.object({
  content: z.string().trim(),
});

export default LearningContentEditionSchema;
