import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import {SocialBar, UserInformationCard} from '../../components';
import {data} from '../../data';
let moment = require('moment');

export default class HomePage extends React.Component {
  static navigationOptions = {
    title: 'TM Loyalty'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.data = data.getArticles();
    this.renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', {id: info.item.id})}>
        <RkCard rkType='imgBlock' style={styles.card}>
          <Image rkCardImg source={info.item.photo}/>

          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header4 inverseColor' numberOfLines={1}>{info.item.header}</RkText>
            <RkText style={styles.time}
                    rkType='secondary2 inverseColor'>{moment().add(info.item.time, 'seconds').fromNow()}</RkText>
          </View>
          <View rkCardFooter>
            <SocialBar rkType='space' showLabel={true}/>
          </View >
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView style={styles.root} >
       <View rkCardContent>
          <UserInformationCard rkType='circle medium' data={{name:'Nguyễn Thái Bình', balance:50000}} img={{uri:'https://s3.amazonaws.com/wspimage/hshot_tsukernik.jpg'}} />
          <FlatList
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container}/>
        </View>        
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginVertical: 8,
  },
  time: {
    marginTop: 5
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 17,
    flex: 1,
  }
}));