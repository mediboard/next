import { Icon } from '@chakra-ui/icons';


export default function UpvoteIcon(props) {
	const {isSelected, ...kv} = props;
	if (isSelected) {
		return (
		  <Icon viewBox='0 0 25.478 28.611' {...kv}>
			  <g id="Upvote_Arrow_-_selected" data-name="Upvote Arrow - selected" transform="translate(-312.338 -502.205)">
			    <path id="Path_2891" data-name="Path 2891" d="M12265.057,1819l12.37,15.268-12.37-5.61-12.33,5.61Z" transform="translate(-11940 -1316)" fill="#767bff" stroke="#767bff" stroke-width="1"/>
			    <path id="Path_2892" data-name="Path 2892" d="M12259,1826.878v20.28h8.639v-20.28" transform="translate(-11938.242 -1316.842)" fill="#767bff" stroke="#767bff" stroke-width="1"/>
			  </g>
		  </Icon>
		);
	}

	return (
	  <Icon viewBox='0 0 25.478 28.611' {...kv}>
		  <g id="Upvote_Arrow_-_unselected" data-name="Upvote Arrow - unselected" transform="translate(-312.338 -502.205)">
		    <path id="Path_2891" data-name="Path 2891" d="M12265.057,1819l12.37,15.268-12.37-5.61-12.33,5.61Z" transform="translate(-11940 -1316)" fill="#707070" stroke="#707070" stroke-width="1"/>
		    <path id="Path_2892" data-name="Path 2892" d="M12259,1826.878v20.28h8.639v-20.28" transform="translate(-11938.242 -1316.842)" fill="#707070" stroke="#707070" stroke-width="1"/>
		  </g>
	  </Icon>
	);
}