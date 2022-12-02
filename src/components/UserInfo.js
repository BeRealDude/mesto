export default class UserInfo {
    constructor({profileName, profileActivity, inputsNames}) {
        this._name = profileName;
        this._activity = profileActivity;
        this._inputsNames = inputsNames;
    }

    getUserInfo() {
        const info = {
            profileName: this._name.textContent,
            profileActivity: this._activity.textContent
          }
          return info;
    }

    setUserInfo = (info) => {
        this._name.textContent = info[this._inputsNames.profileName];
        this._activity.textContent = info[this._inputsNames.profileActivity];
    }
}