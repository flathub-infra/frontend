enum Collections {
  popular = "Popular",
  recentlyUpdated = "Recenlty Updated",
  editorsApps = "Editors Picks Apps",
  editorsGames = "Editors Picks Games"
}
export type Collection = Collections.popular
  | Collections.recentlyUpdated
  | Collections.editorsApps
  | Collections.editorsGames;

export default Collections;
