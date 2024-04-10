import React, { useContext, useState, useRef } from 'react'
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
import './NewTweet.scss'
import ImagePosted from '../ImagePosted/ImagePosted'
import { set } from 'mongoose'
const NewTweet = ({
	placeholder = 'Place Holder',
	isComment,
	toUser,
	idPost
}) => {
  	const [previewUrl, setPreviewUrl] = useState('')
	const fileInputRef = useRef(null)
	const [showphoto, setShowphoto] = useState(false)
	const appContext = useContext(AppContext)


	const [textPost, setTextPost] = useState('')

	const handleChangeInput = (e) => {
		setTextPost(e.target.value)
	}
	
	/*
	function handleFileChange(event) {
		setSelectedFile(event.target.files[0])
	}*/
	function handleFileChange(event) {
		const file = event.target.files[0]
		if (file) {
		  const fileUrl = URL.createObjectURL(file)
		  setPreviewUrl(fileUrl)
		  ImagePosted({ fileUrl })
		}
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
									label={!isComment ? 'Tweet' : 'Reply'}
									isComment={isComment}
									textPost={textPost}
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
                    	{previewUrl && <img src={previewUrl} alt="Preview" width="50"/>}
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
