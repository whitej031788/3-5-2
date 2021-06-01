import useSWR from 'swr'

const fetcher = async url => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export function useEntries() {
  const { data, error } = useSWR(`/api/get-entries`, fetcher)

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCompetitions() {
  const { data, error } = useSWR(`/api/get-competitions`, fetcher)

  return {
    competitions: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useLeagues() {
  const { data, error } = useSWR(`/api/get-leagues`, fetcher)

  return {
    leagues: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function usePlayers(league_id) {
  const { data, error } = useSWR(`/api/get-players?league_id=${league_id}`, fetcher)

  return {
    players: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useLeague(id: string) {
  return useSWR(`/api/get-league?id=${id}`, fetcher)
}

export function useEntry(id: string) {
  return useSWR(`/api/get-entry?id=${id}`, fetcher)
}


export function usePlayerBidData(player_id: string, league_id: string) {
  const { data, error } = useSWR(`/api/get-player-bid?player_id=${player_id}&league_id=${league_id}`, fetcher)
  return {
    bidData: data,
    isLoading: !error && !data,
    isError: error,
  } 
}