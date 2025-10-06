const URL_CONTENT_BASE = 'http://content.br.tim.esportspace.moob.club/'
const URL_CONTENT_BASE_TEST =
  'http://content.test.br.tim.esportspace.moob.club/'
// ---------------------------------------------------------------------
export const API_CONTENT = URL_CONTENT_BASE + 'wp-json/wp/v2/'
export const ENDPOINT_LANDING = URL_CONTENT_BASE + 'api/v1/landing/'
export const ENDPOINT_VALIDATION_HASH =
  URL_CONTENT_BASE + 'wp-json/api/v1/validate_hash/'

const gamehash = 'f51eaaccb7842b4d204e4efcdde512c4' // Game Hash: Trivia eSports Space (Digitel - Venezuela)

export const TRIVIA_GAME_HASH = `https://play.gaming.moob.club/trivia/?gamehash=${gamehash}`

// export const ENDPOINT_GET_TRIVIA_CONFIG = `https://api.gaming.moob.club/api/v1/getTrivia/${gamehash}/1`

export const ENDPOINT_CREATE_USER =
  'https://api.gaming.moob.club/api/v1/createuser'

export const URL_CHATBOT =
  'https://test.moob.club:8005/IA/br/tim/esportspace/chat/index.php'

export const PREFIX_PERSIST_STORE = 'esportspace-tim-brasil'

export const URL_LANDING_SUBS = '/'
