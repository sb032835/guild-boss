module.exports = function  guildboss(mod) {
let settingTimeout = null;
let announce = 0;

    mod.command.add('gb', {
		$none() {
			mod.settings.enabled = !mod.settings.enabled
			mod.command.message(`公會王通知 ${mod.settings.enabled ? '<font color="#56B4E9">[開啟]' : '<font color="#E69F00">[關閉]'}`)
			mod.command.message(`音效id：${mod.settings.sound}`)
		},
		sound(id) {
			clearTimeout(settingTimeout);
			id = Number(id)
			if (id !== Number(id)) {
				return;
			}
			mod.settings.sound = []
			mod.command.message(`[${id}]<font color="#56B4E9"> 加入音效 </font>`)
			settingTimeout = setTimeout(()=>{
			mod.settings.sound.push(id)
			mod.command.message(`[${mod.settings.sound}]<font color="#56B4E9"> 下次進入伺服器時時更換音效 </font>`)
			}, 2000);
		}
	})

    mod.hook('S_NOTIFY_GUILD_QUEST_URGENT', 1, (event) => {
		if (mod.settings.enabled && event.type == announce) {
			if (event.quest === '@GuildQuest:6001001') {
			playSound(SOUND_ID);
			sendmessage('貪婪的阿嵐夏');
			} if (event.quest === '@GuildQuest:6002001') {
				playSound(SOUND_ID);
				sendmessage('憤怒的卡魯古斯');
			} if (event.quest === '@GuildQuest:6003001') {
				playSound(SOUND_ID);
				sendmessage('虐殺的煞布拉尼惡');
			}
        }
    });

const SOUND_ID = Number(mod.settings.sound);

	function playSound(SOUND_ID) {
		mod.send('S_PLAY_SOUND', 1, {
			SoundID: SOUND_ID
		})
	}
	
	function sendmessage(msg) {
		let timeNow = new Date();
        let timeText = timeNow.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2}) + ':' +
                timeNow.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2}) + ':' + 
                timeNow.getSeconds().toLocaleString(undefined, {minimumIntegerDigits: 2});
		mod.send('S_CHAT', 2, {
			authorName: '',
			channel: 7,
			message: '[' + timeText + ']' + msg
		});
	}
}
