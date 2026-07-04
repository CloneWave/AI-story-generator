import { useState } from "react";

const ThemeInput=({onSubmit})=>{
    const [theme,setTheme]=useState("");
    const [error,setError]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(!theme.trim()){
            setError("Please enter a theme");
            return;
        }
        setError("");
        onSubmit(theme);
    };

    return <div className="theme-input-container">
        <h2>Choose a Theme for Your Story</h2>
        <p className="theme-input-description">Enter a theme or genre to begin</p>

        <form onSubmit={handleSubmit} className="theme-input-form">
            <div className="input-group">
                <input type="text" value={theme}
                onChange={(e)=>setTheme(e.target.value)}
                placeholder="e.g. Pirate, Knight, Wizard, Robot.."
                className="theme-input"/>
                
                {error && <p className="error-message">{error}</p>}
            </div>
            <button type="submit" className="submit-button">
                Generate Story
            </button>
        </form>
    </div>
}

export default ThemeInput;