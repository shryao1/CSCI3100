import React, { useContext, useState, useEffect, useRef } from 'react'
import { AppContext } from '../../../Context/AppContext'
import PhotoUser from '../PhotoUser/PhotoUser'
import TextBlue from '../TextBlue/TextBlue'
import BtnTwitter from '../BtnTwitter/BtnTwitter'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import IconButton from '@mui/material/IconButton'
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined'
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import { RetweetContext } from '../../../Context/RetweetContext'
import './NewTweet.scss'
import ImagePosted from '../ImagePosted/ImagePosted'
import { set } from 'mongoose'
const NewTweet = ({
	placeholder = 'Type something here!',
	isComment,
	toUser,
	idPost
}) => {
  	const [previewUrl, setPreviewUrl] = useState(null)
	const [pUrl, setPUrl] = useState('')
	const fileInputRef = useRef(null)
	const [showphoto, setShowphoto] = useState(false)
	const appContext = useContext(AppContext)
	const retweetContext = useContext(RetweetContext)

	const [textPost, setTextPost] = useState('')
	useEffect(() => {
		if (retweetContext?.thereistext) {
		  setTextPost(retweetContext.text)
		}
		if (retweetContext?.thereisattachment && !(retweetContext.attachment===null)){
			if(retweetContext.attachment.contentType==='video/mp4'){
				setPreviewUrl(`data:${retweetContext.attachment.contentType};base64,${uint8ArrayToBase64(new Uint8Array(retweetContext.attachment.data.data))}`)
			}
			else{
				setPreviewUrl(`data:${retweetContext.attachment.contentType};base64,${uint8ArrayToBase64(new Uint8Array(retweetContext.attachment.data.data))}`)
			}
		}
	  }, [retweetContext])
	const handleChangeInput = (e) => {
		setTextPost(e.target.value)
	}
	/*
	function handleFileChange(event) {
		const file = event.target.files[0]
		if (file) {
		  const fileUrl = URL.createObjectURL(file)
		  setPreviewUrl(fileUrl)
		  ImagePosted({ fileUrl })
		}
	}*/

	function handleFileChange(event) {
		const file = event.target.files[0]
		const reader = new FileReader()
		reader.onload = function(){
			const base64string = reader.result.replace('data','')
				.replace(/^.+,/,'')
			//console.log(reader.result)
			setPreviewUrl(reader.result)
		}
		reader.readAsDataURL(file)

		if(file){
			const fileUrl = URL.createObjectURL(file)
			setPUrl(fileUrl)
		  	ImagePosted({ fileUrl })
		}
	}

	
	const uint8ArrayToBase64 = (uint8Array) => {
		let binary = ''
		uint8Array.forEach((byte) => {
			binary += String.fromCharCode(byte)
		})
		return btoa(binary)
	}
	function handleButtonClick() {
		fileInputRef.current.click()
		setShowphoto(true)
	  }
	
	return (
		<div className="newTweet__container">
			<section className="main__navHome">
				{isComment &&
					<div className="text_replying">
						<span>Replying to <TextBlue label={toUser} /></span>
					</div>
				}
				<div className="mainNavHome__Content">
					<div className="mainNavHome__Content-photo">
						
					</div>
					<div className="mainNavHome__Content-form">
						<div className="formNavHome__input">
							<input
								type="text"
								name="text_posted"
								value={textPost}
								onChange={e => handleChangeInput(e)}
								placeholder={placeholder}
							/>
							{!isComment &&
								<div className="formNavHome__input-span">
									<TextBlue label="Everyone can reply" />
								</div>
							}
						</div>
						<div className="formNavHome__options">
							<div className="formNavHome__options-icons">
								<div>
      							<input
       	 						type="file"
       	 						ref={fileInputRef}
        						style={{ display: 'none' }}
        						onChange={handleFileChange}
      								/>
      								<IconButton onClick={handleButtonClick}>
        							<ImageOutlinedIcon style={{ color:'#F0AA23	'}}/>
      							</IconButton>
      							
    							</div>
								<div>
									<GifBoxOutlinedIcon />
								</div>
								{!isComment &&
									<div>
										<PollOutlinedIcon />
									</div>
								}
								<div>
									<SentimentSatisfiedAltOutlinedIcon />
								</div>
								{!isComment &&
									<div>
										<DateRangeOutlinedIcon />
									</div>
								}
								<div>
									<AddLocationAltOutlinedIcon />
								</div>
							</div>
							<div>
								<BtnTwitter
									label={!isComment ? 'Post' : 'Reply'}
									isComment={isComment}
									textPost={textPost}
									media_posted={previewUrl}
									setTextPost={setTextPost}
									toUser={toUser}
									idPost={idPost}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			{showphoto &&
            <>
                	<h1>Selected photo</h1>
                	<div style={{ display: 'flex', justifyContent: 'center' }}>
                    	{pUrl && <img src={pUrl} alt="Preview" width="50"/>}
                	</div>
            	</>
        	}
		</div>
	)
}
/*return (
    	<div>
      	<input
       	 type="file"
       	 ref={fileInputRef}
        	style={{ display: 'none' }}
        	onChange={handleFileChange}
      		/>
      		<IconButton onClick={handleButtonClick}>
        	<ImageOutlinedIcon />
      		</IconButton>
      		{previewUrl && <img src={previewUrl} alt="Preview" />}
    	</div>
  		)
}*/
export default NewTweet
