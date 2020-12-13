/**
 * Component for picking teams to join.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React, { ChangeEvent, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { RootState, TeamInfo, TeamMembership } from '../../../redux/types';
import PickTeam from '../PickTeam';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import { useDispatch, useSelector } from 'react-redux';
import { searchTeams } from '../../../redux/modules/teams';
import classNames from "classnames";

interface Props {
  teams?: TeamMembership[];
}

const useStyles = createUseStyles(styles);

const PickTeams: React.FunctionComponent<Props> = ({ teams }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const allTeamSearches = useSelector((state: RootState) => state.teams.search);

  const [searchString, setSearchString] = useState('');

  const searchedTeamMatches = useMemo(() => {
    return allTeamSearches[searchString]?.items ?? [];
  }, [allTeamSearches, searchString]);

  const onChangeTeamSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchText = e.target.value;
    setSearchString(searchText);

    if (searchText && !allTeamSearches[searchText]?.items?.length) {
      dispatch(searchTeams(searchText));
    }
  };

  return (
    <div className={classes.pickTeams}>
      <div className={classNames(classes.search, !!searchedTeamMatches.length && classes.successfulSearch)}>
        <ImageInput
          type="text"
          name="team"
          placeholder="Search Teams"
          status={ImageInputStatus.NONE}
          onChange={onChangeTeamSearch}
        />
        <div className={classes.searchedTeams}>
          {searchedTeamMatches.map((team: TeamInfo) => (
            <div className={classes.searchedTeam} key={team.name}>
              <p>{team.title}</p>
              <p>&#x4c;</p>
            </div>
          ))}
        </div>
      </div>
      <div>{!!teams && teams.map((team) => <PickTeam team={team} key={team.team_name} />)}</div>
    </div>
  );
};

export default PickTeams;
