import type { Scene } from '../types/prompt';

export function generatePrompt(scene: Scene, allScenes: Scene[] = []): string {
  const params = scene.parameters;
  const getParam = (id: string) => params.find(p => p.id === id)?.selected || '';

  const creature = getParam('creature');
  const mood = getParam('mood');
  const appearance = getParam('appearance');
  const environment = getParam('environment');
  const videoStyle = getParam('videoStyle');
  const aspectRatio = getParam('aspectRatio');
  const movement = getParam('movement');
  const effect = getParam('effect');
  const weather = getParam('weather');
  const lighting = getParam('lighting');
  const quality = getParam('quality');
  const storyDescription = scene.storyDescription?.trim();

  const basePrompt = `Une scène ${mood.toLowerCase()} présentant ${appearance === 'Fantôme' ? 'un' : 'une'} ${appearance.toLowerCase()} de type ${creature}, rendue en ${quality} dans un style ${videoStyle.toLowerCase()} au format ${aspectRatio}. 

Cette entité évolue dans ${environment.toLowerCase()}, où l'atmosphère est chargée de ${weather.toLowerCase()}. La scène est dramatiquement illuminée par ${lighting.toLowerCase()}, avec des mouvements ${movement.toLowerCase()}. ${effect ? `L'effet spécial "${effect}" accentue la présence de la créature.` : ''}

La combinaison de ces éléments crée une atmosphère unique qui ${mood.toLowerCase() === 'terrifiante' ? 'glace le sang' : 'captive le regard'}.`;

  const isLastScene = allScenes.length > 0 && scene.id === allScenes[allScenes.length - 1].id;
  if (isLastScene) {
    const combinedPrompt = allScenes.map((s, index) => {
      const scenePrompt = s.id === scene.id ? basePrompt : generateSingleScenePrompt(s);
      const transition = index < allScenes.length - 1 ? generateTransition(s, allScenes[index + 1]) : '';
      return `${s.storyDescription ? s.storyDescription + '\n\n' : ''}${scenePrompt}${transition ? '\n\n' + transition : ''}`;
    }).join('\n\n');
    return combinedPrompt;
  }

  if (storyDescription) {
    return `${storyDescription}\n\n${basePrompt}`;
  }

  return basePrompt;
}

function generateSingleScenePrompt(scene: Scene): string {
  const params = scene.parameters;
  const getParam = (id: string) => params.find(p => p.id === id)?.selected || '';

  return `Une scène ${getParam('mood').toLowerCase()} présentant ${getParam('appearance') === 'Fantôme' ? 'un' : 'une'} ${getParam('appearance').toLowerCase()} de type ${getParam('creature')}, dans ${getParam('environment').toLowerCase()}.`;
}

export function generateTransition(fromScene: Scene, toScene: Scene): string {
  const fromMood = fromScene.parameters.find(p => p.id === 'mood')?.selected;
  const toMood = toScene.parameters.find(p => p.id === 'mood')?.selected;
  const fromEnvironment = fromScene.parameters.find(p => p.id === 'environment')?.selected;
  const toEnvironment = toScene.parameters.find(p => p.id === 'environment')?.selected;
  
  const transition = toScene.transition || {
    type: 'évolue',
    speed: 'progressivement',
    style: 'dans un tourbillon de',
    intensity: 'ténèbres'
  };
  
  return `La scène ${transition.type} ${transition.speed}, ${transition.style} ${transition.intensity}, passant d'une ambiance ${fromMood?.toLowerCase()} dans ${fromEnvironment?.toLowerCase()} vers une atmosphère ${toMood?.toLowerCase()} dans ${toEnvironment?.toLowerCase()}...`;
}