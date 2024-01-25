import { mainPaths, workPaths } from '../../routes/site-paths';
import Work from './window-contents/Work.svelte';
import Who from './window-contents/QAndA.svelte';
import BoomiDataVis from './window-contents/work-pages/BoomiDataVis.svelte';
import ComicSans from './window-contents/work-pages/ComicSans.svelte';
import NGSBuild from './window-contents/work-pages/NGSBuild.svelte';
import ElSayHPark from './window-contents/work-pages/ElSayHPark.svelte';
import MerchantGourmet from './window-contents/work-pages/MerchantGourmet.svelte';
import BakerHughesDataVis from './window-contents/work-pages/BakerHughesDataVis.svelte';
import type { Links } from '../../types/ContentWindow.type';

export const workLinks: Links = {
	[workPaths.boomi]: {
		text: 'Boomi',
		component: BoomiDataVis,
		initWidth: 1200,
		initHeight: 900
	},
	[workPaths.comicUltraLight]: {
		text: 'CS Ultralight',
		component: ComicSans,
		initWidth: 800,
		initHeight: 900
	},
	[workPaths.ngs]: {
		text: 'NGS',
		component: NGSBuild,
		initWidth: 800,
		initHeight: 900
	},
	[workPaths.elPark]: {
		text: 'El Say h’ Park',
		component: ElSayHPark,
		initWidth: 800,
		initHeight: 900
	},
	[workPaths.merchantGourmet]: {
		text: 'Merchant Gourmet',
		component: MerchantGourmet,
		initWidth: 800,
		initHeight: 900
	},
	[workPaths.bakerHughes]: {
		text: 'Baker Hughes',
		component: BakerHughesDataVis,
		initWidth: 800,
		initHeight: 900
	}
};

export const mainLinks: Links = {
	// [mainPaths.words]: { text: 'Words', component: Words, initWidth: 1200, initHeight: 900 },
	[mainPaths.work]: {
		text: 'Projects',
		component: Work,
		initWidth: 1200,
		initHeight: 900,
		links: workLinks
	},
	[mainPaths.qAndA]: { text: 'Q&A', component: Who, initWidth: 800, initHeight: 800 }
};

export const allLinks: Links = {
	...mainLinks,
	...workLinks
};
