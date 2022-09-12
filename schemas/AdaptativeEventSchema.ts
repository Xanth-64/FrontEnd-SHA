import { z } from 'zod';

const AdaptativeEventSchema = z.object({
  triggered_change: z
    .string()
    .min(1, 'Debe de Seleccionar un Cambio a Producir.'),
  condition_aggregator: z
    .string()
    .min(1, 'Debe de Seleccionar un Agregador Condicional.'),
  adaptation_conditions: z
    .array(
      z.object({
        value_to_compare: z
          .number()
          .min(0, 'El Valor de Comparación debe ser mayor o igual a 0.')
          .max(100, 'El Valor de Comparación debe ser menor o igual a 100.'),
        comparation_condition: z
          .string()
          .min(1, 'Debe de Seleccionar una Condición de Comparación.'),
        variable_to_compare: z
          .string()
          .min(1, 'Debe de Seleccionar una Variable de Comparación.'),
      })
    )
    .min(
      1,
      'El evento adaptativo debe tener como mínimo una condición adaptativa asociada.'
    ),
});

export default AdaptativeEventSchema;
