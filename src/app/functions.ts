export function msToHMS(ms) {
  let seconds: number = Math.trunc(ms / 1000);
  const hours: number = Math.trunc(seconds / 3600); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  const minutes: number = Math.trunc(seconds / 60); // 60 seconds in 1 minute
  seconds = seconds % 60;

  let finalString = '';

  if (hours < 10) {
    finalString = finalString + '0' + hours;
  } else {
    finalString = finalString + hours;
  }

  if (minutes < 10) {
    finalString = finalString + ':' + '0' + minutes;
  } else {
    finalString = finalString + ':' + minutes;
  }

  if (seconds < 10) {
    finalString = finalString + ':' + '0' + seconds;
  } else {
    finalString = finalString + ':' + seconds;
  }

  return finalString;
}

export function minToMs(min) {
  return min * 60 * 1000;
}

export function getTimeDiff(lastChange: Date) {
  return Date.now() - lastChange.getTime();
}

export function actualTime(player) {
  var moneyMilisec:number = minToMs(player.money);
  var difference:number = getTimeDiff(new Date(player.changedAt));
  var negative:boolean = (moneyMilisec - difference) < 0;

  if (negative) {
    return 0;
  }
  return Math.abs(moneyMilisec - difference);
}



export function getActualIteration() {
  let iteration = localStorage.getItem('chtIterator');
  if (iteration === null) {
    iteration = '1';
  }
  return iteration;
}
