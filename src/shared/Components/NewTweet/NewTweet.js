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
import './NewTweet.scss'
import ImagePosted from '../ImagePosted/ImagePosted'
const NewTweet = ({
	placeholder = 'Place Holder',
	isComment,
	toUser,
	idPost
}) => {
	const [files, setFiles] = useState([])
  	const [selectedFile, setSelectedFile] = useState(null)
  	const [previewUrl, setPreviewUrl] = useState('')
	const fileInputRef = useRef(null)
  	useEffect(() => {
    	fetchFiles()
  	}, [])

	const appContext = useContext(AppContext)


	const [textPost, setTextPost] = useState('')

	const handleChangeInput = (e) => {
		setTextPost(e.target.value)
	}
	async function fetchFiles() {
		try {
		  const response = await fetch('http://localhost:3001/files')
		  if (!response.ok) {
				throw new Error('Network response was not ok')
		  }
		  const files = await response.json()
		  setFiles(files)
		} catch (error) {
		  console.error('Failed to fetch files:', error)
		}
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

	async function handleFileUpload(event) {
		event.preventDefault()
		if (!selectedFile) return
	
		const formData = new FormData()
		formData.append('file', selectedFile)
	
		try {
		  const response = await fetch('http://localhost:3001/upload', {
				method: 'POST',
				body: formData,
		  })
	
		  if (!response.ok) {
				throw new Error('Upload failed')
		  }
	
		  fetchFiles() // Refresh the list after uploading
		  setSelectedFile(null) // Reset selected file
		} catch (error) {
		  console.error('Upload error:', error)
		}
	}
	function handleButtonClick() {
		fileInputRef.current.click() // 当按钮被点击时，触发文件输入框的点击事件
	  }
	function handleFileClick(fileId) {
		// Construct the URL for the image
		const fileUrl = `http://localhost:3001/file/${fileId}`
		setPreviewUrl(fileUrl)
		ImagePosted({fileUrl})
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
						{appContext?.user &&
							<PhotoUser url={appContext?.user.user_photo} />
						}
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
        							<ImageOutlinedIcon />
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
			<h1>Selected photo</h1>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				{previewUrl && <img src={previewUrl} alt="Preview" width="50"/>}
			</div>
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
