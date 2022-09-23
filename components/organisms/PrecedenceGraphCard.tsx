import { Card, Center, Stack, Title, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { ForceGraphMethods } from 'react-force-graph-2d';

import precedenceGraphCardProps from '../../types/component_schemas/precedenceGraphCardProps';

import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';

const PrecedenceGraphCard = ({
  graphData,
  updatePrecedenceGraph,
  loadingState,
}: precedenceGraphCardProps) => {
  const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
  });
  useEffect(updatePrecedenceGraph, []);
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  const fgRef = useRef<ForceGraphMethods>();

  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <CustomLoadingOverlay visible={loadingState} />
        <Center>
          <Title order={3}>Grafo de Prelaciones</Title>
        </Center>
        <Center>
          <ForceGraph2D
            graphData={graphData}
            nodeId={'id'}
            nodeLabel={'title'}
            linkSource={'predecessor'}
            linkTarget={'successor'}
            ref={fgRef}
            backgroundColor={theme.colors.gray[1]}
            width={!mobile ? 500 : 250}
            height={!mobile ? 500 : 250}
            nodeAutoColorBy={'id'}
            linkAutoColorBy={'id'}
            linkLabel={'label'}
            linkDirectionalArrowLength={!mobile ? 5 : 3}
            linkDirectionalArrowRelPos={!mobile ? 0.5 : 0.3}
            linkDirectionalArrowColor={'id'}
            enableNodeDrag={false}
            enableZoomInteraction={true}
            enablePanInteraction={true}
          />
        </Center>
      </Stack>
    </Card>
  );
};

export default PrecedenceGraphCard;
