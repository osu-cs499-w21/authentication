import {
  credentialsAreValid,
  generateAuthToken,
  setAuthCookie
} from '../../lib/auth';

export default (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ err: "Only POSTs are supported" });
  } else {
    const { username, password } = req.body;
    if (credentialsAreValid(username, password)) {
      // res.status(200).json({
      //   token: generateAuthToken(username)
      // });
      setAuthCookie(res, generateAuthToken(username));
      res.status(200).json({ msg: "OK!" });
    } else {
      res.status(401).json({ err: "Invalid credentials" });
    }
  }
}
