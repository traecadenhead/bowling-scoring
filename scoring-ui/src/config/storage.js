export default class storage {

    static set_game_id = (game_id) => {
        localStorage.setItem("game_id", game_id);
    }

    static get_game_id = () => {
        return localStorage.getItem("game_id");
    }
}