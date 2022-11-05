import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';


export function useRemoteData(fetchFn, parameters) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
	}, [parameters])

	useEffect(() => {
		if (isLoading) {
			fetchFn(...parameters).then(data => {
				setData(data);
			}).catch(error => {
				console.log(error);
			}).finally(() => {
				setIsLoading(false);
			})
		}
	}, [isLoading])

	return [data, isLoading];
}

export function useOnScreen(ref) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}

export function useTimer(seconds) {
	const [timerIsComplete, setTimerIsComplete] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setTimerIsComplete(true), seconds);
		return () => clearTimeout(timer);
	}, [])

	return timerIsComplete;
}

export function useOnRouteMatchChange(matchPath) {
	const [match, setMatch] = useState(undefined);
	const routerMatch = useRouteMatch(matchPath);
	const location = useLocation();

	useEffect(() => {
		setMatch(routerMatch);
	}, [location])

	return match
}

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}