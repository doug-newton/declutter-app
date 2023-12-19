//  FAMILY 
export interface AddFamilyData {
    name: string
}

export interface FamilyMember {
  _id: string
  name: string
  email: string
}

export interface Family extends AddFamilyData {
    _id: string
    members: FamilyMember[]
}

export interface AddFamilyResult {
  message: string
  familyId: string | null
}

export interface GetFamilyResult {
  message: string
  family: Family
}

export interface FamilyMembersResult {
  message: string
  familyMembers: FamilyMember[]
}

//  CLUTTER

export interface AddClutterData {
  name: string
  description: string | null
}

export interface AddClutterResponse {
  message: string
  clutterId: string
}

export interface ClutterVoteCount {
  keep: number
  discard: number
}

export interface Clutter extends AddClutterData {
  _id: string
  addedBy: string
  name: string
  description: string | null
  voteCounts: ClutterVoteCount
}

export interface GetClutterResponse {
  message: string,
  clutter: Clutter[]
}

export interface ClutterVoteResult {
  message: string
  votes: ClutterVoteCount
}

//  AUTH

export interface SignupDetails {
  name: string
  email: string
  password: string
}

export interface UserCredentials {
  email: string
  password: string
}

export interface LoginResult {
  token: string | null
  userId: string | null
  familyId?: string
}

export interface SignupResult {
  message: string
}

//  USERS

export interface UserDetails {
  name: string
}
