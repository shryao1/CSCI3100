/**
 * useIsMyTweet.js
 * Description: This custom hook checks if the tweet belongs to the logged-in user.
 * 
 * @param {string} username - The username of the tweet owner.
 * @param {string} userLogged - The username of the logged-in user.
 * @returns {boolean} A boolean value indicating whether the tweet belongs to the logged-in user.
 * 
 * Example Usage:
 * const isMyTweet = useIsMyTweet(tweet.username, loggedInUser.username);
 */

const useIsMyTweet = (username, userLogged) => {
	return username === userLogged
}

export default useIsMyTweet