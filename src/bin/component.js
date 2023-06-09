import Avatar from "primevue/avatar";
import Panel from 'primevue/panel';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import AutoComplete from 'primevue/autocomplete';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import Inplace from 'primevue/inplace';
import InputText from 'primevue/inputtext';
import Chips from 'primevue/chips';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
import Password from "primevue/password";
import OverlayPanel from "primevue/overlaypanel";
import Menu from "primevue/menu";
import ProgessBar from "primevue/progressbar";
import Textarea from "primevue/textarea";
import Tooltip from 'primevue/tooltip';

function loadComponents(app) {
    app.component('Avatar', Avatar);
    app.component('Panel', Panel);
    app.component('Toolbar', Toolbar);
    app.component('Button', Button);
    app.component('Dropdown', Dropdown);
    app.component('AutoComplete', AutoComplete);
    app.component('Card', Card);
    app.component('Tag', Tag);
    app.component('Dialog', Dialog);
    app.component('Inplace', Inplace);
    app.component('InputText', InputText);
    app.component('Chips', Chips);
    app.component('Checkbox', Checkbox);
    app.component('Divider', Divider);
    app.component('Password', Password);
    app.component('OverlayPanel', OverlayPanel);
    app.component("Menu", Menu);
    app.component("ProgressBar", ProgessBar);
    app.component("Textarea", Textarea);

    app.directive('tooltip', Tooltip);
}

export {
    loadComponents
}