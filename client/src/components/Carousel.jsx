import React from "react";
import ReactDOM from "react-dom";

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div
				id="carouselExampleControls"
				className="carousel slide"
				data-ride="carousel"
			>
				<a
					onClick={() => {
						this.props.toggleCarousel();
					}}
				>
					{" "}
					Close photos X{" "}
				</a>
				<div className="carousel-inner">
					{this.props.photos.map((photo, i) => {
						if (photo === this.props.photos[0]) {
							return (
								<div className="carousel-item active">
									<img
										className="d-block w-100"
										src={photo.url}
									/>
								</div>
							);
						} else {
							return (
								<div className="carousel-item">
									<img
										className="d-block w-100"
										src={photo.url}
									/>
								</div>
							);
						}
					})}
				</div>
				<a
					className="carousel-control-prev"
					href="#carouselExampleControls"
					role="button"
					data-slide="prev"
				>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					/>
					<span className="sr-only">Previous</span>
				</a>
				<a
					className="carousel-control-next"
					href="#carouselExampleControls"
					role="button"
					data-slide="next"
				>
					<span
						className="carousel-control-next-icon"
						aria-hidden="true"
					/>
					<span className="sr-only">Next</span>
				</a>
			</div>
		);
	}
}

export default Carousel;