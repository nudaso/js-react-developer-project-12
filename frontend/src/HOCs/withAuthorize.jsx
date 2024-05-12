import { useAuth } from "../contexts/authContext"

function withAuthorize({Authorized, Unauthorized}) {
  return function WithAuthorizeComponent ({to, ...props}) {
    const { authData } = useAuth();
    return authData ? <Authorized {...props} /> : <Unauthorized to={to} {...props} />
  }
}

export default withAuthorize;