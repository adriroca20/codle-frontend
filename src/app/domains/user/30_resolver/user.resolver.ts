import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {finalize, forkJoin, Observable, of} from 'rxjs';

import {GameFacade} from '../../game/20_abstraction';
import {IUser} from '../00_model';
import {UserFacade} from '../20_abstraction';

export const DriverResolverFn: ResolveFn<DriverScreenData> = (route: ActivatedRouteSnapshot) => {
  const _userFacade: UserFacade = inject(UserFacade);
  const _gameFacade: GameFacade = inject(GameFacade);

  let showOverlaySpinner = false;

  const currentDriverScreenData: DriverScreenData = _getCurrentState();

  const request: DriverScreenDataRequest = _createRequest(currentDriverScreenData);

  return forkJoin({...request})
      .pipe(
          finalize(() => showOverlaySpinner = false),
      );

  function _getCurrentState(): DriverScreenData {
    const drivers: IUser[] = _driverFacade.getDriversLatestValue();
    const nationalities: BasicEntity[] = _countryFacade.getCountriesList();
    const teams: BasicEntity[] = _teamsFacade.getTeamsAsBasicEntities();

    return {
      drivers,
      nationalities,
      teams,
    };
  }

  function _createRequest(currentState: DriverScreenData): DriverScreenDataRequest {
    const driversAreLoaded = !!currentState.drivers.length;
    const countriesAreLoaded = !!currentState.nationalities.length;
    const teamsAreLoaded = !!currentState.teams.length;

    const storageIsLoaded = driversAreLoaded && countriesAreLoaded && teamsAreLoaded;

    if (!storageIsLoaded) {
      showOverlaySpinner = true;
      console.warn({showOverlaySpinner});
    }

    return {
      drivers: driversAreLoaded ? of(currentState.drivers) : _driverFacade.loadDriverOutput$(),
      nationalities: countriesAreLoaded ? of(currentState.nationalities) : _countryFacade.loadCountries$(),
      teams: teamsAreLoaded ? of(currentState.teams) : _teamsFacade.loadTeamOutput$(),
    };
  }
};

interface DriverScreenDataRequest {
  drivers: Observable<Driver[]>;
  nationalities: Observable<BasicEntity[]>;
  teams: Observable<BasicEntity[]>;
}

interface DriverScreenData {
  drivers: Driver[];
  nationalities: BasicEntity[];
  teams: BasicEntity[];
}
