<template>
    <div class="panel">
        <el-form label-position="left" size="small">
            <el-form-item label="税前工资">
                <el-input v-model="beforeTaxIncome"></el-input>
            </el-form-item>
            <el-form-item label="社保基数">
                <el-input v-model="socialSecurityBase" :disabled="!customSocialSecurityBase"></el-input>
                <el-switch
                    v-model="customSocialSecurityBase"
                    active-text="自定义社保基数/公积金">
                </el-switch>
            </el-form-item>
            <el-form-item label="税后工资">
                <el-input v-model="afterTaxIncome"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator';
    const limits = {
        SH: {
            socialSecurity: [4279,],
            housingFund: [2300,]
        }

    };

    @Component({
        name: "SalaryCalculator",
        data: function() {
            return {
                beforeTaxIncome: 0,
                socialSecurityBase: 0,
                housingFundBase: 0,
                customSocialSecurityBase: false,
                recalculating: false
            }
        },
        computed: {
            companyTotalCost: function () {
                return this.beforeTaxIncome + this.socialSecurityBase * 0.366;
            },
            afterSocialSecurityIncome: function () {
                return this.beforeTaxIncome - this.socialSecurityBase * 0.11;
            },
            afterTaxIncome: function() {
                let taxedIncome = this.beforeTaxIncome * 0.89, res = 0;
                if(taxedIncome > 85000) {

                }
                if(taxedIncome > 5000){
                    res += 5000;
                    if(taxedIncome > 8000) {
                        res += 2910;
                        if(taxedIncome > 17000) {
                            res += 8100;
                            if(taxedIncome > 30000) {
                                res += 10400;
                                if(taxedIncome > 30000) {
                                    res += 10400;
                                }
                                else res += (taxedIncome - 17000) * 0.8;
                            }
                            else res += (taxedIncome - 17000) * 0.8;
                        }
                        else res += (taxedIncome - 8000) * 0.9;
                    }
                    else res += (taxedIncome - 5000) * 0.97;
                }
                else res += taxedIncome;





                if(taxedIncome > 40000) res += 7500;
                else res += (taxedIncome - 30000) * 0.75;

                if(taxedIncome > 60000) res += 14000;
                else res += (taxedIncome - 40000) * 0.7;

                if(taxedIncome > 85000) res += 16250;
                else res += (taxedIncome - 60000) * 0.65;

                if(taxedIncome > 85000) res += 16250 + (taxedIncome - 85000) * 0.55;
                else res += (taxedIncome - 60000) * 0.65;

                return res;
            }
        },
        watch: {
            customSocialSecurityBase (val) {
                if(val) {
                    this.socialSecurityBase = this.beforeTaxIncome;
                }
            },
            beforeTaxIncome (val) {
            }
        },
        methods: {
            checkSSHF() {
                let bti = this.beforeTaxIncome;

            }
        }
    })
    export default class SalaryCalculator extends Vue {}
</script>

<style scoped>
    .panel {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
