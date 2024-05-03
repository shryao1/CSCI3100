/**
 * PhotoUser.jsx
 *
 * Description: This file contains the PhotoUser component, which displays a user's photo based on the provided URL.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.url - The URL of the user's photo.
 * @param {string} [props.size='48'] - The size of the photo. Defaults to 48px.
 * 
 * @returns {JSX.Element} The rendered component displaying the user's photo.
 * 
 * Example Usage:
 * <PhotoUser url="https://example.com/userphoto.jpg" size="64" />
 */
 
import React from 'react'
import './PhotoUser.scss'

const uint8ArrayToBase64 = (uint8Array) => {
	let binary = ''
	uint8Array.forEach((byte) => {
		binary += String.fromCharCode(byte)
	})
	return btoa(binary)
}

const PhotoUser = ({ url, size = '48' }) => {
	// console.log(url)
	// console.log(uint8ArrayToBase64(new Uint8Array(url)))
	return (
		<div className="photo__user-container">
			{url && url !== '' ? (
				<img
					src={`data:image/jpeg;base64,${uint8ArrayToBase64(new Uint8Array(url))}`}
					alt="User Photo"
					width={size}
					height={size}
					loading="lazy"
				/>
			) : (
				<img
					src={null}
					alt="User Photo Placeholder"
					width={size}
					height={size}
					loading="lazy"
				/>
			)}
		</div>
	)
}

export default PhotoUser
