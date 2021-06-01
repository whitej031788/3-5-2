import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
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
  return useSWR(`/api/get-player-bid?player_id=${player_id}&league_id=${league_id}`, fetcher)
}