import { getConfig } from "../config";

const config = getConfig();

function getAuthenticationHeader(token) {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}

function getAudience(){
  var aud = config.audience
  return aud;
}

export { getAuthenticationHeader, getAudience };