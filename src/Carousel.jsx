import { Component } from "react";

class Carousel extends Component {
    state = {
        active: 0
    }

    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
    }

    handleIndexClick = (e) => {
        this.setState({
            active: +e.target.dataset.index,
        });
    }

    render () {
        const { active } = this.state
        const { images } = this.props

        return (
            <div className="">
                <img className="my-0 mx-auto pb-10" src={images[active]} alt="animal hero" />
                <div className="pl-32 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((photo, index) =>(
                        <img
                          onClick={this.handleIndexClick}
                          data-index={index}
                          key={photo}
                          src={photo}
                          className={index === active ? "active" : ""}
                          alt="animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;