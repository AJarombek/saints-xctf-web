/**
 * Custom React hooks which are used on group admin pages.
 * @author Andrew Jarombek
 * @since 1/9/2021
 */

import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

export const useGroupId = (): number => {
  const routeMatch = useRouteMatch();

  const [groupId, setGroupId] = useState<number>(null);

  useEffect(() => {
    const { id: groupId } = routeMatch.params as { id: string };
    setGroupId(+groupId);
  }, [routeMatch.params]);

  return groupId;
};
