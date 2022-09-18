import { Stack } from '@mantine/core';
import {
  useEventListener,
  useIdle,
  useIntersection,
  useInterval,
} from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../lib/constants/axiosInstance';
import measurableInteraction from '../../types/api_schemas/measurableInteraction';
import measurableInteractionDetectionWrapperProps from '../../types/component_schemas/measurableInteractionDetectionWrapperProps';

const MeasurableInteractionDetectionWrapper = ({
  children,
  learningContent,
}: measurableInteractionDetectionWrapperProps) => {
  const [measurableInteractions, setMeasurableInteractions] = useState<
    measurableInteraction[]
  >([]);

  // Defining Variables for Observation of each Kind of Interaction
  const [observationSeconds, setObservationSeconds] = useState<number>(0);
  const [idleObservationSeconds, setIdleObservationSeconds] =
    useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);

  // Define Intersection Observer Ref to Validate that the User is Seeing the Element
  const { ref, entry } = useIntersection({
    threshold: 0.2,
  });
  // Define idle to see if the user has been idle for at the very least five seconds
  const idle = useIdle(5000);

  // Setup an event listener for counting clicks
  const incrementClicks = useCallback(() => setClicks((c) => c + 1), []);
  const clickRef = useEventListener('click', incrementClicks);

  // Setup an Interval Observer for Counting Observation Seconds
  const observationIntervalHandler = useInterval(
    () => setObservationSeconds((s) => s + 1),
    1000
  );
  const idleObservationIntervalHandler = useInterval(
    () => setIdleObservationSeconds((s) => s + 1),
    1000
  );

  // Setup usEffect for Handling Changes in Idle & Observation State
  useEffect(() => {
    if (entry?.isIntersecting) {
      observationIntervalHandler.start();
    } else {
      observationIntervalHandler.stop();
    }

    if (entry?.isIntersecting && idle) {
      idleObservationIntervalHandler.start();
    } else {
      idleObservationIntervalHandler.stop();
    }
  }, [idle, entry?.isIntersecting]);

  // Setup a helper function to trigger an Interaction:
  const trigger_interaction = async (interactionID: string) => {
    try {
      await axiosInstance.post('/interaction_fired/', {
        measurable_interaction_id: interactionID,
      });
    } catch (error: any) {
      console.error('Error when Firing Interaction =>', interactionID);
    }
  };

  // Setup useEffects for Handling Changes on Each variable
  useEffect(() => {
    measurableInteractions.forEach((interaction) => {
      if (
        interaction.interaction_trigger === 'observe' &&
        interaction.interaction_threshold === observationSeconds
      ) {
        trigger_interaction(interaction.id);
      }
    });
  }, [observationSeconds]);
  useEffect(() => {
    measurableInteractions.forEach((interaction) => {
      if (
        interaction.interaction_trigger === 'idle_observe' &&
        interaction.interaction_threshold === idleObservationSeconds
      ) {
        trigger_interaction(interaction.id);
      }
    });
  }, [idleObservationSeconds]);
  useEffect(() => {
    measurableInteractions.forEach((interaction) => {
      if (
        interaction.interaction_trigger === 'click' &&
        interaction.interaction_threshold === clicks
      ) {
        trigger_interaction(interaction.id);
      }
    });
  }, [clicks]);

  const fetchMeasurableInteractions = () => {
    const inner_function = async () => {
      if (learningContent) {
        try {
          const { data } = await axiosInstance.get(
            '/measurable_interaction/by_learning_content/categorized',
            {
              params: {
                learning_content_id: learningContent?.id,
              },
            }
          );
          setMeasurableInteractions(
            data.data.not_completed_measurable_interactions
          );
        } catch (error: any) {
          console.error('An Error Ocurred Fetching Measurable Interactions');
        }
      }
    };
    inner_function();
  };
  useEffect(fetchMeasurableInteractions, [learningContent]);
  return (
    <>
      <Stack ref={ref}>
        <Stack ref={clickRef}>{children}</Stack>
      </Stack>
    </>
  );
};

export default MeasurableInteractionDetectionWrapper;
