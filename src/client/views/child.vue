<template>
  <div class="child">
    <h3 class="child-title">疫情管理系统</h3>
    <van-loading v-show="loading"/>
    <van-form @submit="onSubmit">
      <van-field
              v-model="username"
              name="userName"
              label="姓名"
              placeholder="姓名"
              :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field v-model="phone" name="phone" label="手机号" :rules="phoneRules" />
      <van-field name="healthInfor" label="体温">
        <van-radio-group v-model="healthInfor" direction="horizontal" slot="input">
          <van-radio name="1" class="radio-item">正常</van-radio>
          <van-radio name="2" class="radio-item">发烧</van-radio>
        </van-radio-group>
      </van-field>
      <van-field
              readonly
              clickable
              name="department"
              :value="departValue"
              label="选择器"
              placeholder="点击选择部门"
              @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
        />
      </van-popup>
      <van-field name="workStatus" label="是否上班">
        <van-radio-group v-model="workStatus" direction="horizontal"  slot="input">
          <van-radio name="1" class="radio-item">是</van-radio>
          <van-radio name="2" class="radio-item">否</van-radio>
        </van-radio-group>
      </van-field>
      <van-field
              readonly
              clickable
              name="city"
              :value="cityValue"
              label="选择器"
              placeholder="点击选择城市"
              @click="showCity = true"
      />
      <van-popup v-model="showCity" position="bottom">
        <van-area :area-list="areaList"   @confirm="onConfirmCity" @cancel="showCity = false" />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
 import { Toast } from 'vant'
 import areaListVal from '@/client/static/area.js'
export default {
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
          message:'龙船游qq戏',
          username: '',
          phone: '',
          healthInfor: "1",
          departValue:  '',
          columns: ['财务部', '产品部', 'UI部门', '测试部门', '后端开发部'],
          showPicker: false,
          showCity:  false,
          workStatus: '1',
          areaList: areaListVal,
          cityValue: '',
          loading: false,
          phoneRules: [{ required: true, message: '请输入手机号' },
              { validator: this.phoneValidator, message: '手机号格式错误' }]
      }
  },
    created() {
        this.getAllPlatform();
    },
    methods: {
        getAllPlatform: function () {
            // `user_name`, `tel`, `health_status`, `department`, `address`, `work_status`, `longitude`
            this.$http({
                method: 'get',
                url: '/users/deleteData',
                params:{'id': '2'}
            })
                .then( (res) => {
                    console.log('retddqd', res);
                    this.list = res.result;
                    this.finished = true;
                })
                .catch( (err) => {
                    console.log(err);
                });
        },
        onConfirm(value) {
            this.departValue = value;
            this.showPicker = false;
        },
        onConfirmCity(value){
            console.log('value:', value);
             value.map((item, index, value) => {
                 if(index === value.length - 1){
                     this.cityValue += item.name;
                 }else{
                     this.cityValue += item.name + "-";
                 }
            });
            this.showCity = false;
        },
        onSubmit(values) {
            console.log('value:', values);
            this.submitData(values);
        },
        submitData(value){
            // `user_name`, `tel`, `health_status`, `department`, `address`, `work_status`, `longitude`
            console.log('value:', value);
            this.loading = true;
            this.$http({
                method: 'get',
                url: '/users/addData',
                params:{'user_name': value.userName, 'tel': value.phone, 'health_status': value.healthInfor, 'department': value.department
                    , 'address':  value.city, 'work_status':value.workStatus,'longitude': ''}
            })
                .then( (res) => {
                    console.log('retddqd', res);
                    this.loading = false;
                    Toast(res.message);
                })
                .catch( (err) => {
                    console.log(err);
                });
        },
        phoneValidator(val) {
            return /1\d{10}/.test(val);
        },
    }
}
</script>
<style  lang="less">
  @import  "../../client/static/color.less";
  .radio-item{
    margin: 5px 10px 5px 0px;
    float: left;
  }

  .child-title{
    text-align: center;
    color: @blue-theme;
  }

</style>