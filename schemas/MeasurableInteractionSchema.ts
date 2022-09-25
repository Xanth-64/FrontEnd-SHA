import { z } from 'zod';

const MeasurableInteractionSchema = z
  .object({
    interaction_weight: z
      .number()
      .min(0, 'La ponderación de la interacción debe ser mayor o igual a 0')
      .max(
        100,
        'La ponderación de la interacción debe ser menor o igual a 100'
      ),
    interaction_threshold: z
      .number()
      .min(1, 'La mínima interacción es perceptible es de 1 unidad'),
    interaction_trigger: z
      .enum(['observe', 'click', 'idle_observe'])
      .default('click'),
    learning_style_attribute: z
      .enum(['VISUAL', 'AURAL', 'KINESTHETIC', 'TEXTUAL'])
      .nullable()
      .optional(),
  })
  .refine(
    (measurableInteraction) => {
      return (
        measurableInteraction.interaction_trigger !== 'click' ||
        measurableInteraction.interaction_threshold <= 5
      );
    },
    {
      message:
        'Si el tipo de Interacción es de "Pulsar" el máximo umbral de percepción es de 5',
      path: ['interaction_threshold'],
    }
  );

export default MeasurableInteractionSchema;
