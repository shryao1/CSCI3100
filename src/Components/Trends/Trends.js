import './Trends.scss'
import SearchLogo from './search_logo.png'
import SearchIcon from './search_icon.png'
const Trends = () => {
	return (
		<div className='trends__container' style={{ justifyContent: 'start', marginTop: '10px' }}>
			<div className="container__search" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        		<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<input
						type="text"
						className="search-input"
						placeholder="Type Anything Here..."
						aria-label="Search trends"
						style={{
							backgroundImage: `url(${SearchIcon})`,
							backgroundSize: '21px 21px',
							backgroundPosition: '10px center',
							backgroundRepeat: 'no-repeat',
							paddingLeft: '45px' // Adjust as necessary
						}}
					/>
					<button className="search-button">Search</button>
				</div>
				<img src={SearchLogo} alt="Search Logo" className="search-logo" style={{width: 320, height: 320}}/>
			</div>
		</div>
	)
}

export default Trends
