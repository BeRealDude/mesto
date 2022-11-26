export default class UserInfo {
    constructor(profileInfo) {
        this._name = document.querySelector(profileInfo.name);
        this._activity = document.querySelector(profileInfo.activity);
    }

    getUserInfo() {
        return {
            profileName: this._name.textContent,
            profileActivity: this._activity.textContent
          }
    }

    setUserInfo = (name, activity) => {
        this._name.textContent = name;
        this._activity.textContent = activity;
    }
}